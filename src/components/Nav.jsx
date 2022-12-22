import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav =()=> {
    return (
            <div className="header">
                <nav>
                    <NavLink activeClassName="navActive" exact className="nav-item" to="/about">About</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/skills">Skills</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/experience">Experience</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/projects">Projects</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/achievements">Achievements</NavLink> 
                    <NavLink activeClassName="navActive"  className="nav-item" to="/codingprofile">Coding Profile</NavLink> 

                </nav>
            </div>
    );
  }
  
  export default Nav;
  