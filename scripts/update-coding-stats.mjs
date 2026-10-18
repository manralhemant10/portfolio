import fs from 'node:fs/promises';
const username='MrTenHunter', userId='91752', start=2020;
async function json(url,opts={}){const r=await fetch(url,{...opts,signal:AbortSignal.timeout(25000),headers:{'Accept':'application/json',...(opts.headers||{})}});if(!r.ok)throw Error(url+' HTTP '+r.status);return r.json();}
async function lc(query,variables={}){const x=await json('https://leetcode.com/graphql',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query,variables:{username,...variables}})});if(x.errors?.length||!x.data?.matchedUser)throw Error('LeetCode query failed');return x.data.matchedUser;}
const years=Array.from({length:new Date().getUTCFullYear()-start+1},(_,i)=>start+i);
const heatData=Object.fromEntries(years.map(y=>[y,Array(new Date(Date.UTC(y+1,0,1))-new Date(Date.UTC(y,0,1))===31622400000?366:365).fill(0)]));
function addDay(value,count){const d=new Date(value);if(isNaN(d))return;const y=d.getUTCFullYear(),arr=heatData[y];if(!arr)return;const i=Math.floor((Date.UTC(y,d.getUTCMonth(),d.getUTCDate())-Date.UTC(y,0,1))/86400000);arr[i]+=Number(count)||0;}
const [profile,skills,stop,topics]=await Promise.all([
 lc('query($username:String!){matchedUser(username:$username){submitStats{acSubmissionNum{difficulty count}}}}'),
 lc('query($username:String!){matchedUser(username:$username){tagProblemCounts{advanced{tagName problemsSolved} intermediate{tagName problemsSolved} fundamental{tagName problemsSolved}}}}'),
 json('https://www.stopstalk.com/user/get_stopstalk_user_stats.json?user_id='+userId+'&custom=False'),
 json('https://www.stopstalk.com/user/get_solved_unsolved.json?user_id='+userId+'&custom=False')
]);
const leet=Number(profile.submitStats.acSubmissionNum.find(x=>x.difficulty==='All')?.count||0);
const platforms={LeetCode:leet,...stop.solved_counts},tags={};
for(const group of Object.values(skills.tagProblemCounts||{}))for(const item of group||[])tags[item.tagName]=(tags[item.tagName]||0)+Number(item.problemsSolved||0);
for(const [name,list] of Object.entries(topics.solved_problems||{}))if(Array.isArray(list))tags[name]=(tags[name]||0)+list.length;
for(const [date,v] of Object.entries(stop.calendar_data||{}))addDay(date+'T00:00:00Z',v.AC);
for(let i=0;i<years.length;i+=3){await Promise.all(years.slice(i,i+3).map(async year=>{const x=await lc('query($username:String!,$year:Int){matchedUser(username:$username){userCalendar(year:$year){submissionCalendar}}}',{year});for(const [ts,count] of Object.entries(JSON.parse(x.userCalendar.submissionCalendar||'{}')))addDay(Number(ts)*1000,count)}));}
let streak=0,maxStreak=0;
for(const y of years)for(const count of heatData[y]){streak=count?streak+1:0;maxStreak=Math.max(maxStreak,streak);}
const output={updatedAt:new Date().toISOString(),totalSolved:leet+Number(stop.solved_problems_count||0),maxStreak,platforms,tags,heatData};
await fs.mkdir('public/data',{recursive:true});await fs.writeFile('public/data/coding-stats.json',JSON.stringify(output));console.log('Updated stats');
