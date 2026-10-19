import React from 'react';
import {Link} from 'react-router-dom';
import dp from '../images/dp.jpg';
import './engineeringConsole.css';

export default function About() {
  return <main className="console-home">
    <div className="console-grid" aria-hidden="true"/>
    <section className="console-hero">
      <div className="console-hero-copy">
        <div className="console-eyebrow"><span className="console-live-dot"/> SOFTWARE ENGINEER · BANKING SYSTEMS · SECURITY</div>
        <h1>Building systems<br/>that <em>hold up.</em></h1>
        <p className="console-lead">I'm <strong>Hemant Singh Manral</strong> — a full-stack engineer focused on reliable financial platforms, high-volume data pipelines, and AI-powered security automation.</p>
        <div className="console-actions">
          <Link className="console-primary" to="/experience">Explore my work <span aria-hidden="true">↗</span></Link>
          <Link className="console-secondary" to="/projects">View projects <span aria-hidden="true">→</span></Link>
        </div>
        <div className="console-links">
          <a href="https://github.com/manralhemant10" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/hemant-singh-manral-7a33a6174/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <Link to="/codingprofile">Coding activity ↗</Link>
        </div>
      </div>
      <div className="console-visual">
        <div className="console-orbit console-orbit-one" aria-hidden="true"/>
        <div className="console-orbit console-orbit-two" aria-hidden="true"/>
        <div className="console-portrait"><img src={dp} alt="Portrait of Hemant Singh Manral"/></div>
        <div className="console-terminal">
          <div className="console-terminal-top"><span className="console-terminal-lights">● ● ●</span><span>engineering / focus</span></div>
          <div><span className="console-prompt">➜</span> <span className="console-command">cat</span> expertise.txt</div>
          <div className="console-terminal-output">Java · Spring Boot · Distributed Data</div>
          <div className="console-terminal-output">Application Security · AI Automation</div>
          <div><span className="console-prompt">➜</span> <span className="console-cursor">▌</span></div>
        </div>
      </div>
    </section>
    <section className="console-proof" aria-label="Engineering highlights">
      <article><span className="console-proof-number">1,000+</span><span className="console-proof-label">Security findings remediated</span></article>
      <article><span className="console-proof-number">10</span><span className="console-proof-label">Applications using security automation</span></article>
      <article><span className="console-proof-number">Millions</span><span className="console-proof-label">Of records processed in enterprise workflows</span></article>
    </section>
    <section className="console-focus">
      <div><span className="console-section-kicker">WHAT I WORK ON</span><h2>Engineering where<br/>reliability matters.</h2></div>
      <div className="console-focus-cards">
        <Link to="/experience"><span>01 / FINANCIAL SYSTEMS</span><h3>Enterprise platforms</h3><p>Market-data ingestion, messaging, backend services, and high-volume processing.</p><b>Explore experience ↗</b></Link>
        <Link to="/experience"><span>02 / SECURITY ENGINEERING</span><h3>Automation with impact</h3><p>AI-assisted vulnerability triage, remediation workflows, and secure modernization.</p><b>Explore experience ↗</b></Link>
        <Link to="/codingprofile"><span>03 / PROBLEM SOLVING</span><h3>Always improving</h3><p>Algorithmic thinking and consistent practice across competitive coding platforms.</p><b>View coding activity ↗</b></Link>
      </div>
    </section>
    <footer className="console-footer">BUILT WITH CURIOSITY <span>© {new Date().getFullYear()} HEMANT SINGH MANRAL</span></footer>
  </main>;
}