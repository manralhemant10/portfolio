import React from 'react';
import parse from 'html-react-parser';
import ExperienceObj from './ExperienceObj';
import '../engineeringConsole.css';

export default function Experience(){
 return <main className="ec-page">
   <div className="ec-page-head"><span className="ec-kicker">01 / THE JOURNEY</span><h1>Built in production.<br/><em>Proven by impact.</em></h1><p>From banking APIs to critical market-data systems and security automation—here's where the work happened.</p></div>
   <section className="ec-timeline" aria-label="Professional experience">
     {ExperienceObj.exp.map((item,index)=><article className="ec-timeline-entry" key={item.company}>
       <div className="ec-timeline-side"><span className="ec-timeline-index">0{index+1}</span><span className="ec-timeline-date">{item.duration}</span></div>
       <div className="ec-timeline-node" aria-hidden="true"/>
       <div className="ec-timeline-card"><div className="ec-card-top"><span>{item.company}</span><span>{index===0?'CURRENT ROLE':'EXPERIENCE'}</span></div><h2>{item.title}</h2><div className="ec-experience-copy">{parse(item.desc)}</div></div>
     </article>)}
   </section>
   <div className="ec-endnote">ENGINEERING PRINCIPLE <strong>Make complex systems understandable, dependable, and secure.</strong></div>
 </main>;
}