import React,{useState} from 'react';
export default function HeatMapContainer({yearsToList=[],heatData={}}){
 const [selected,setSelected]=useState(String(new Date().getFullYear()));
 const year=yearsToList.includes(selected)?selected:yearsToList[yearsToList.length-1];
 if(!year)return <p>Activity calendar not available yet.</p>;
 const counts=heatData[year]||[];
 const firstWeekday=(new Date(Date.UTC(Number(year),0,1)).getUTCDay()+6)%7;
 const cells=[...Array(firstWeekday).fill(null),...counts];
 const total=counts.reduce((sum,n)=>sum+n,0);
 const active=counts.filter(n=>n>0).length;
 return <div className="ec-calendar">
   <div className="ec-calendar-head"><div><strong>{active}</strong> active days <span>· {total.toLocaleString()} recorded activities</span></div><label htmlFor="coding-year">YEAR <select id="coding-year" value={year} onChange={e=>setSelected(e.target.value)}>{yearsToList.map(y=><option key={y} value={y}>{y}</option>)}</select></label></div>
   <div className="ec-calendar-scroll"><div className="ec-calendar-grid" role="img" aria-label={'Coding activity for '+year+', '+active+' active days'}>{cells.map((count,i)=>count===null?<span key={'pad-'+i} className="ec-calendar-empty"/>:<span key={i} title={new Date(Date.UTC(Number(year),0,i-firstWeekday+1)).toISOString().slice(0,10)+': '+count+' recorded activities'} className={'coding-day level-'+(count===0?0:count<3?1:count<6?2:count<10?3:4)}/>)}</div></div>
   <div className="ec-calendar-legend">Less <span className="coding-day level-0"/><span className="coding-day level-1"/><span className="coding-day level-2"/><span className="coding-day level-3"/><span className="coding-day level-4"/> More</div>
 </div>;
}