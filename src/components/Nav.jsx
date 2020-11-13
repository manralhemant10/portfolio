import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav =()=> {
    return (
            <div className="header">
                <nav>
                    <NavLink activeClassName="navActive" exact className="nav-item" to="/">About</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/skills">Skills</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/experience">Experience</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/projects">Projects</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/achievements">Achievements</NavLink> 
                </nav>
            </div>
    );
  }
  
  export default Nav;
  