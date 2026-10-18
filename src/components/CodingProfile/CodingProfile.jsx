import React,{useEffect,useState} from 'react';
import HeatMapContainer from './HeatMapContainer';
import './codingDashboard.css';
import '../engineeringConsole.css';

export default function CodingProfile(){
 const [data,setData]=useState(null),[error,setError]=useState(''),[platform,setPlatform]=useState('All');
 useEffect(()=>{const controller=new AbortController();fetch(process.env.PUBLIC_URL+'/data/coding-stats.json',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Missing snapshot');return r.json()}).then(setData).catch(e=>{if(e.name!=='AbortError')setError('Coding statistics are temporarily unavailable.')});return()=>controller.abort()},[]);
 const sources=data?.sources||{},available=Object.keys(data?.platforms||{});
 const selectedHeat=platform==='All'?data?.heatData:data?.platformHeatData?.[platform];
 const selectedTags=platform==='All'?data?.tags:data?.platformTags?.[platform];
 return <main className="ec-page ec-coding-page">
   <div className="ec-page-head"><span className="ec-kicker">04 / THE PRACTICE</span><h1>Consistency<br/><em>compounds.</em></h1><p>One coding journey across multiple platforms. Activity, problem solving, and learning—updated automatically when sources are available.</p></div>
   {error&&<p className="ec-feedback" role="alert">{error} <a href="https://leetcode.com/u/MrTenHunter/" target="_blank" rel="noopener noreferrer">Visit LeetCode ↗</a></p>}
   {!data&&!error&&<p className="ec-feedback" role="status">Loading coding activity…</p>}
   {data&&<>
    <div className="ec-coding-metrics"><article><span>TOTAL PLATFORM SOLVES</span><strong>{data.totalSolved?.toLocaleString()||'0'}</strong><small>Sum of available platform totals</small></article><article><span>BEST COMBINED STREAK</span><strong>{data.maxStreak||0}<i> days</i></strong><small>Across available activity histories</small></article><article><span>LAST SYNC</span><strong className="ec-date">{data.updatedAt?new Date(data.updatedAt).toLocaleDateString():'—'}</strong><small>Automated snapshot</small></article></div>
    <section className="ec-panel"><div className="ec-panel-head"><div><span className="ec-kicker">ACTIVITY / TIMELINE</span><h2>The contribution trail</h2></div><span className="ec-panel-sub">Each active day moves the streak forward</span></div><div className="ec-tabs" role="group" aria-label="Activity platform">{['All',...available].map(name=><button key={name} type="button" aria-pressed={platform===name} onClick={()=>setPlatform(name)}>{name==='All'?'All platforms':name}</button>)}</div><HeatMapContainer yearsToList={Object.keys(selectedHeat||{}).sort()} heatData={selectedHeat||{}}/><p className="ec-note">Calendar reflects submission activity where available. An unavailable or incomplete platform history may understate your all-time streak.</p></section>
    <div className="ec-coding-columns"><section className="ec-panel"><span className="ec-kicker">CONNECTED SOURCES</span><h2>Platform breakdown</h2><div className="ec-platform-list">{Object.entries(sources).map(([name,status])=><div key={name}><div><strong>{data.profileLinks?.[name]?<a href={data.profileLinks[name]} target="_blank" rel="noopener noreferrer">{name} ↗</a>:name}</strong><small>{status}</small></div><b>{data.platforms?.[name]===undefined?'—':data.platforms[name].toLocaleString()}</b></div>)}</div></section>
    <section className="ec-panel"><span className="ec-kicker">KNOWLEDGE MAP</span><h2>Topics explored</h2><div className="ec-topic-list">{Object.entries(selectedTags||{}).sort((a,b)=>b[1]-a[1]).slice(0,14).map(([name,count])=><div key={name}><span>{name}</span><div className="ec-topic-track"><div style={{width:(100*count/Math.max(1,...Object.values(selectedTags||{})))+'%'}}/></div><b>{count}</b></div>)}</div></section></div>
   </>}
 </main>;
}