import React, { useEffect, useState } from 'react';
import HeatMapContainer from './HeatMapContainer';
import './codingDashboard.css';
export default function CodingProfile() {
 const [data,setData]=useState(null), [error,setError]=useState('');
 useEffect(()=>{const controller=new AbortController();fetch(process.env.PUBLIC_URL+'/data/coding-stats.json',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Missing stats');return r.json()}).then(setData).catch(e=>{if(e.name!=='AbortError')setError('Statistics are temporarily unavailable.')});return()=>controller.abort()},[]);
 return <main className="coding-dashboard"><header><small>ENGINEERING / PROBLEM SOLVING</small><h1>Coding Activity</h1><p>Algorithms, data structures and competitive programming.</p></header>
 {!data&&!error&&<p role="status">Loading statistics…</p>}
 {error&&<p role="alert">{error} <a href="https://leetcode.com/MrTenHunter/" target="_blank" rel="noopener noreferrer">View LeetCode</a></p>}
 {data&&<><section className="coding-metrics"><article><span>Problems solved</span><strong>{data.totalSolved||0}</strong></article><article><span>Best streak</span><strong>{data.maxStreak||0} days</strong></article><article><span>Last updated</span><strong>{data.updatedAt?new Date(data.updatedAt).toLocaleDateString():'—'}</strong></article></section>
 <section className="coding-panel"><h2>Contribution activity</h2><HeatMapContainer yearsToList={Object.keys(data.heatData||{}).sort()} heatData={data.heatData||{}}/></section>
 <section className="coding-panel"><h2>Platforms</h2><div className="coding-chips">{Object.entries(data.platforms||{}).map(([k,v])=><span key={k}>{k}: {v}</span>)}</div></section>
 <section className="coding-panel"><h2>Topics</h2><div className="coding-chips">{Object.entries(data.tags||{}).sort((a,b)=>b[1]-a[1]).map(([k,v])=><span key={k}>{k}: {v}</span>)}</div></section></>}
 </main>;
}