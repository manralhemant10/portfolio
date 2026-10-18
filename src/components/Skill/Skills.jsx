import React from 'react';
import SkillObj from './SkillObj';
import '../engineeringConsole.css';

const descriptions={
 "Programming Languages":"The tools I use to turn ideas into reliable code.",
 "Backend & Web":"From APIs and services to the interfaces people rely on.",
 "Databases & Data":"Handling the complexity of enterprise-scale information.",
 "Security & Tooling":"Shipping confidently, securely, and repeatedly."
};
export default function Skills(){
 return <main className="ec-page">
   <div className="ec-page-head"><span className="ec-kicker">02 / THE TOOLKIT</span><h1>Depth over<br/><em>buzzwords.</em></h1><p>Technologies I've worked with, organized by the problems they help me solve—not arbitrary percentage ratings.</p></div>
   <div className="ec-skill-grid">{Object.entries(SkillObj).map(([category,skills],index)=><section className="ec-skill-group" key={category}>
     <div className="ec-skill-heading"><span>0{index+1}</span><h2>{category}</h2></div><p>{descriptions[category]}</p>
     <div className="ec-skill-pills">{skills.map(skill=><span key={skill.name}>{skill.name}</span>)}</div>
   </section>)}</div>
   <div className="ec-endnote">HOW I LEARN <strong>Understand the fundamentals. Apply them to real systems. Keep improving.</strong></div>
 </main>;
}