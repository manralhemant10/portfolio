import fs from 'node:fs/promises';

const username = 'MrTenHunter';
const firstYear = 2020;
const currentYear = new Date().getUTCFullYear();
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
  totalSolved: solved,
  maxStreak,
  platforms,
  tags,
  heatData,
  sources: {LeetCode: 'available', StopStalk: 'unavailable'},
  note: 'Problem totals reflect LeetCode only; activity calendar counts submissions.'
};
await fs.mkdir('public/data', {recursive: true});
await fs.writeFile('public/data/coding-stats.json', JSON.stringify(output) + '\n');
console.log('Saved LeetCode snapshot: ' + solved + ' problems, ' + successfulCalendars + ' calendar years');
