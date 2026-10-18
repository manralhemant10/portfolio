import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './engineeringConsole.css';

export default function Nav() {
  const [open,setOpen] = useState(false);
  const links = [
    ['/about','Home'], ['/experience','Experience'], ['/skills','Skills'],
    ['/projects','Projects'], ['/codingprofile','Coding']
  ];
  return <header className="header console-nav">
    <NavLink to="/about" className="console-brand" onClick={()=>setOpen(false)} aria-label="Hemant Singh Manral — home"><span className="console-brand-mark">HM<span>.</span></span><span className="console-brand-name">HEMANT MANRAL</span></NavLink>
    <button className="console-menu-toggle" type="button" aria-expanded={open} aria-controls="console-navigation" onClick={()=>setOpen(!open)}>{open?'Close ✕':'Menu ☰'}</button>
    <nav id="console-navigation" className={'console-nav-links'+(open?' is-open':'')} aria-label="Main navigation">
      {links.map(([to,label])=><NavLink key={to} exact={to==='/about'} activeClassName="navActive" className="nav-item" to={to} onClick={()=>setOpen(false)}>{label}</NavLink>)}
    </nav>
    <a className="console-nav-github" href="https://github.com/manralhemant10" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
  </header>;
}