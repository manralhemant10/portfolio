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
if (codechefHandle) sourceStatus.CodeChef = 'pending adapter';
if (hackerrankHandle) sourceStatus.HackerRank = 'pending adapter';
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
