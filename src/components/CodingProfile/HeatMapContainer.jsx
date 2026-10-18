import React,{useState} from 'react';
export default function HeatMapContainer({yearsToList=[],heatData={}}){
 const [selected,setSelected]=useState(String(new Date().getFullYear()));
 const year=yearsToList.includes(selected)?selected:yearsToList[yearsToList.length-1];
 if(!year)return <p>Activity calendar not available yet.</p>;
 return <div><label htmlFor="coding-year">Year </label><select id="coding-year" value={year} onChange={e=>setSelected(e.target.value)}>{yearsToList.map(y=><option key={y} value={y}>{y}</option>)}</select><div className="coding-heatmap" role="img" aria-label={'Coding activity '+year}>{(heatData[year]||[]).map((count,i)=><span key={i} title={'Day '+(i+1)+': '+count+' submissions'} className={'coding-day level-'+(count===0?0:count<3?1:count<6?2:count<10?3:4)}/>)}</div></div>
}