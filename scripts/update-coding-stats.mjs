import fs from 'node:fs/promises';

const username = 'MrTenHunter';
const firstYear = 2020;
const currentYear = new Date().getUTCFullYear();
const codeforcesHandle = (process.env.CODEFORCES_HANDLE || 'mrtenhunter').trim();
const codechefHandle = (process.env.CODECHEF_HANDLE || 'mrtenhunter').trim();
const hackerrankHandle = (process.env.HACKERRANK_HANDLE || 'manralhemant10').trim();
const sourceStatus = {LeetCode: 'available', Codeforces: 'not configured', CodeChef: 'not configured', HackerRank: 'not configured'};
const profileLinks = {LeetCode: 'https://leetcode.com/u/' + username};
if (codeforcesHandle) profileLinks.Codeforces = 'https://codeforces.com/profile/' + encodeURIComponent(codeforcesHandle);
if (codechefHandle) profileLinks.CodeChef = 'https://www.codechef.com/users/' + encodeURIComponent(codechefHandle);
if (hackerrankHandle) profileLinks.HackerRank = 'https://www.hackerrank.com/profile/' + encodeURIComponent(hackerrankHandle);
const years = Array.from({length: currentYear - firstYear + 1}, (_, i) => firstYear + i);

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(25000),
    headers: {Accept: 'application/json', ...(options.headers || {})}
  });
  if (!response.ok) throw new Error(url + ' returned HTTP ' + response.status);
  return response.json();
}

async function leetcode(query, variables = {}) {
  const response = await request('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Referer: 'https://leetcode.com/'},
    body: JSON.stringify({query, variables: {username, ...variables}})
  });
  if (response.errors?.length) throw new Error('LeetCode GraphQL: ' + JSON.stringify(response.errors));
  if (!response.data?.matchedUser) throw new Error('LeetCode user unavailable');
  return response.data.matchedUser;
}

async function optional(label, action) {
  try { return await action(); }
  catch (error) { console.warn(label + ' unavailable: ' + error.message); return null; }
}

const heatData = Object.fromEntries(years.map(year => [
  String(year),
  Array((Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000).fill(0)
]));

function addDay(timestamp, count) {
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) return;
  const year = String(date.getUTCFullYear());
  if (!heatData[year]) return;
  const day = Math.floor((Date.UTC(+year, date.getUTCMonth(), date.getUTCDate()) - Date.UTC(+year, 0, 1)) / 86400000);
  heatData[year][day] += Number(count) || 0;
}

const profile = await leetcode('query($username:String!){matchedUser(username:$username){submitStats{acSubmissionNum{difficulty count}}}}');
const solved = Number(profile.submitStats?.acSubmissionNum?.find(x => x.difficulty === 'All')?.count || 0);
const tags = {};
const skills = await optional('LeetCode skills', () => leetcode('query($username:String!){matchedUser(username:$username){tagProblemCounts{advanced{tagName problemsSolved} intermediate{tagName problemsSolved} fundamental{tagName problemsSolved}}}}'));
for (const group of Object.values(skills?.tagProblemCounts || {})) {
  for (const item of group || []) tags[item.tagName] = (tags[item.tagName] || 0) + Number(item.problemsSolved || 0);
}

let successfulCalendars = 0;
for (let index = 0; index < years.length; index += 3) {
  await Promise.all(years.slice(index, index + 3).map(async year => {
    const result = await optional('LeetCode calendar ' + year, () => leetcode('query($username:String!,$year:Int){matchedUser(username:$username){userCalendar(year:$year){submissionCalendar}}}', {year}));
    if (!result?.userCalendar?.submissionCalendar) return;
    try {
      const entries = JSON.parse(result.userCalendar.submissionCalendar);
      for (const [seconds, count] of Object.entries(entries)) addDay(Number(seconds) * 1000, count);
      successfulCalendars++;
    } catch (error) { console.warn('Calendar parse error ' + year + ': ' + error.message); }
  }));
}

const platforms = {LeetCode: solved};
const platformTags = {LeetCode: tags};
const platformHeatData = {LeetCode: JSON.parse(JSON.stringify(heatData))};

if (codeforcesHandle) {
  try {
    // Codeforces' public user.status API returns submission verdicts and problem metadata.
    // Count distinct accepted problem IDs, not accepted submissions.
    const accepted = new Map();
    const submissionDays = new Map();
    let offset = 1;
    const batchSize = 1000;
    while (true) {
      const response = await request('https://codeforces.com/api/user.status?handle=' +
        encodeURIComponent(codeforcesHandle) + '&from=' + offset + '&count=' + batchSize);
      if (response.status !== 'OK' || !Array.isArray(response.result)) throw new Error('Invalid Codeforces API response');
      for (const submission of response.result) {
        if (Number.isFinite(submission.creationTimeSeconds)) {
          const day = new Date(submission.creationTimeSeconds * 1000).toISOString().slice(0, 10);
          submissionDays.set(day, (submissionDays.get(day) || 0) + 1);
        }
        if (submission.verdict !== 'OK' || !submission.problem) continue;
        const problem = submission.problem;
        const key = String(problem.contestId ?? 'unknown') + ':' + String(problem.index ?? problem.name);
        if (!accepted.has(key)) accepted.set(key, {problem, timestamp: submission.creationTimeSeconds});
      }
      if (response.result.length < batchSize) break;
      offset += batchSize;
      if (offset > 50000) {console.warn('Codeforces history capped at 50,000 submissions');break;}
    }
    platforms.Codeforces = accepted.size;
    const cfTags = {};
    const cfHeat = Object.fromEntries(years.map(y => [String(y), Array(heatData[String(y)].length).fill(0)]));
    for (const [date, count] of submissionDays) {
      const d = new Date(date + 'T00:00:00Z');
      const year = String(d.getUTCFullYear());
      if (!cfHeat[year]) continue;
      const day = Math.floor((Date.UTC(+year, d.getUTCMonth(), d.getUTCDate()) - Date.UTC(+year, 0, 1)) / 86400000);
      cfHeat[year][day] += count;
      heatData[year][day] += count;
    }
    for (const {problem} of accepted.values()) {
      for (const tag of problem.tags || []) cfTags[tag] = (cfTags[tag] || 0) + 1;
    }
    platformTags.Codeforces = cfTags;
    platformHeatData.Codeforces = cfHeat;
    sourceStatus.Codeforces = 'available';
  } catch (error) {
    console.warn('Codeforces unavailable: ' + error.message);
    sourceStatus.Codeforces = 'unavailable';
  }
}

async function htmlRequest(url) {
  const response = await fetch(url, {signal: AbortSignal.timeout(30000), headers: {
    Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36'
  }});
  if (!response.ok) throw new Error('HTTP ' + response.status + ' from ' + url);
  return response.text();
}
function newCalendar() {
  return Object.fromEntries(years.map(y => [String(y), Array(heatData[String(y)].length).fill(0)]));
}
function recordCalendar(calendar, dateString, value) {
  const date = new Date(dateString);
  const count = Number(value);
  if (!Number.isFinite(date.getTime()) || !Number.isFinite(count) || count <= 0) return;
  const year = String(date.getUTCFullYear());
  if (!calendar[year]) return;
  const day = Math.floor((Date.UTC(+year, date.getUTCMonth(), date.getUTCDate()) - Date.UTC(+year, 0, 1)) / 86400000);
  calendar[year][day] += count;
}
function mergeCalendar(calendar) {
  for (const [year, counts] of Object.entries(calendar)) counts.forEach((n, day) => { heatData[year][day] += n; });
}

if (codechefHandle) {
  try {
    // CodeChef publishes the total and daily submissions inside public profile HTML.
    const html = await htmlRequest(profileLinks.CodeChef);
    const match = html.match(/Total Problems Solved\s*:?\s*<[^>]*>\s*(\d+)/i)
      || html.match(/Total Problems Solved\s*:?\s*(\d+)/i);
    if (!match) throw new Error('Solved count not found in CodeChef profile');
    const count = Number(match[1]);
    if (!Number.isSafeInteger(count)) throw new Error('Invalid solved count');
    platforms.CodeChef = count;
    const calendar = newCalendar();
    const heat = html.match(/(?:var|let|const)\s+userDailySubmissionsStats\s*=\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*;/);
    if (heat) {
      try {
        const data = JSON.parse(heat[1]);
        const entries = Array.isArray(data) ? data.map(item => [item.date || item.day, item.value ?? item.count ?? item.total]) : Object.entries(data);
        for (const [day, count] of entries) recordCalendar(calendar, day, count);
        mergeCalendar(calendar);
      } catch (error) { console.warn('CodeChef heatmap parse failed: ' + error.message); }
    } else console.warn('CodeChef profile did not expose heatmap data');
    platformHeatData.CodeChef = calendar;
    platformTags.CodeChef = {};
    sourceStatus.CodeChef = heat ? 'available' : 'partial (no calendar)';
  } catch (error) {
    console.warn('CodeChef adapter failed: ' + error.message);
    sourceStatus.CodeChef = 'unavailable';
  }
}
if (hackerrankHandle) {
  try {
    const base = 'https://www.hackerrank.com/rest/hackers/' + encodeURIComponent(hackerrankHandle);
    const calendar = newCalendar();
    const history = await optional('HackerRank submission history', () => request(base + '/submission_histories', {
      headers: {'User-Agent': 'Mozilla/5.0 Chrome/131.0 Safari/537.36'}
    }));
    const raw = history?.models || history?.model || history?.submission_histories || history?.data || history;
    if (raw && typeof raw === 'object') {
      const entries = Array.isArray(raw) ? raw.map(item => [item.date || item.timestamp || item.day, item.count ?? item.value ?? item.submissions ?? 1]) : Object.entries(raw);
      for (const [day, count] of entries) recordCalendar(calendar, /^\d{10,13}$/.test(String(day)) ? Number(day) * (String(day).length === 10 ? 1000 : 1) : day, count);
    }
    const challenges = new Set();
    let cursor = null;
    for (let page = 0; page < 25; page++) {
      const url = base + '/recent_challenges?limit=100&response_version=v2' + (cursor ? '&cursor=' + encodeURIComponent(cursor) : '');
      const data = await request(url, {headers: {'User-Agent': 'Mozilla/5.0 Chrome/131.0 Safari/537.36'}});
      const models = data.models || data.data?.models || [];
      if (!Array.isArray(models)) throw new Error('Invalid HackerRank challenges response');
      for (const item of models) {
        const slug = item.ch_slug || item.slug || item.challenge?.slug;
        if (slug) challenges.add(slug);
      }
      const next = data.cursor || data.next_cursor || data.pagination?.next_cursor;
      if (!next || next === cursor || !models.length) break;
      cursor = next;
    }
    if (!challenges.size) throw new Error('No verifiable solved challenge records');
    platforms.HackerRank = challenges.size;
    platformTags.HackerRank = {};
    platformHeatData.HackerRank = calendar;
    mergeCalendar(calendar);
    sourceStatus.HackerRank = history ? 'available' : 'partial (no calendar)';
  } catch (error) {
    console.warn('HackerRank adapter failed: ' + error.message);
    sourceStatus.HackerRank = 'unavailable';
  }
}

let maxStreak = 0;
let streak = 0;
for (const year of years) {
  for (const count of heatData[String(year)]) {
    streak = count > 0 ? streak + 1 : 0;
    maxStreak = Math.max(maxStreak, streak);
  }
}
const output = {
  updatedAt: new Date().toISOString(),
  totalSolved: Object.values(platforms).reduce((sum, count) => sum + count, 0),
  maxStreak,
  platforms,
  tags: Object.entries(platformTags).reduce((acc, [,values]) => { for (const [tag, count] of Object.entries(values)) acc[tag] = (acc[tag] || 0) + count; return acc; }, {}),
  heatData,
  platformTags,
  platformHeatData,
  profileLinks,
  sources: sourceStatus,
  note: 'Solved totals are unique per platform and summed across platforms. LeetCode and Codeforces calendars count submissions (attempts), while solved totals count unique accepted problems per platform. Best streak uses the union of available platform activity days; unavailable sources may make it incomplete.'
};
await fs.mkdir('public/data', {recursive: true});
await fs.writeFile('public/data/coding-stats.json', JSON.stringify(output) + '\n');
console.log('Saved coding snapshot: ' + JSON.stringify(platforms) + ', ' + successfulCalendars + ' LeetCode calendar years');
