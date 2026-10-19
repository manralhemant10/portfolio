import React,{useEffect,useMemo,useState} from 'react';
import '../engineeringConsole.css';

const featured=[
 {name:'kailash-priya-wedding',title:'An invitation, reimagined',kind:'INTERACTIVE EXPERIENCE',description:'An immersive digital wedding invitation combining visual storytelling, cultural details, and responsive interaction.'},
 {name:'portfolio',title:'Engineering Console',kind:'WEB EXPERIENCE',description:'A personal engineering portfolio with automated multi-platform coding statistics and an opinionated design system.'}
];
export default function Projects(){
 const [repos,setRepos]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(false),[query,setQuery]=useState(''),[sort,setSort]=useState('featured');
 useEffect(()=>{const controller=new AbortController();fetch('https://api.github.com/users/manralhemant10/repos?per_page=100&sort=updated',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('GitHub unavailable');return r.json()}).then(data=>{if(!Array.isArray(data))throw Error('Unexpected response');setRepos(data.filter(r=>!r.fork));}).catch(e=>{if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false));return()=>controller.abort()},[]);
 const items=useMemo(()=>{const list=repos.map(r=>{const feature=featured.find(f=>f.name===r.name);return {...r,displayTitle:feature?.title||r.name.replace(/[-_]/g,' '),displayDescription:feature?.description||r.description||'Explore the implementation and source code on GitHub.',kind:feature?.kind||'OPEN SOURCE',featured:!!feature};}).filter(r=>[r.name,r.description,...(r.topics||[])].join(' ').toLowerCase().includes(query.toLowerCase()));return list.sort((a,b)=>sort==='stars'?b.stargazers_count-a.stargazers_count:sort==='recent'?new Date(b.pushed_at)-new Date(a.pushed_at):Number(b.featured)-Number(a.featured)||new Date(b.pushed_at)-new Date(a.pushed_at));},[repos,query,sort]);
 return <main className="ec-page">
   <div className="ec-page-head"><span className="ec-kicker">03 / THE BUILDS</span><h1>Ideas made<br/><em>real.</em></h1><p>A living collection of software, experiments, and things I wanted to make better. Pulled directly from GitHub.</p></div>
   <div className="ec-project-tools"><label className="ec-search-label">FIND A PROJECT<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or technologies…" aria-label="Search projects"/></label><label className="ec-sort-label">SORT BY<select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured first</option><option value="recent">Recently updated</option><option value="stars">Most starred</option></select></label></div>
   {loading&&<p className="ec-feedback" role="status">Loading repositories…</p>}
   {error&&<div className="ec-feedback">GitHub projects couldn't load right now. <a href="https://github.com/manralhemant10" target="_blank" rel="noopener noreferrer">Browse repositories directly ↗</a></div>}
   {!loading&&!error&&items.length===0&&<p className="ec-feedback">No projects match your search.</p>}
   <div className="ec-project-grid">{items.map((r,index)=><a key={r.id} className={'ec-project-card'+(r.featured?' ec-project-featured':'')} href={r.html_url} target="_blank" rel="noopener noreferrer">
     <div className="ec-card-top"><span>{r.kind}</span><span>{String(index+1).padStart(2,'0')} ↗</span></div>
     <div><h2>{r.displayTitle}</h2><p>{r.displayDescription}</p></div>
     <div className="ec-project-bottom"><div className="ec-skill-pills">{(r.topics||[]).slice(0,4).map(t=><span key={t}>{t}</span>)}</div><span>★ {r.stargazers_count||0}</span></div>
   </a>)}</div>
 </main>;
}