import React from 'react';
import {Switch,Route } from 'react-router-dom';
import Nav from './components/Nav'
import About from './components/About'
import Skills from './components/Skill/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Project/Projects';
import Achievements from './components/Achievement/Achievements';
import CodingProfile from './components/CodingProfile/CodingProfile';

function App() {
  return (
   <div className="mainDiv">
      <Nav/>
        <Switch>
          <Route  path="/about" component ={About}/>
          <Route  path="/skills" component={Skills}/>
          <Route  path="/experience" component={Experience}/>
          <Route  path="/projects" component={Projects}/>
          <Route  path="/achievements" component={Achievements}/>
          <Route path="/codingprofile" component={CodingProfile}/>
          <Route path="/" component={About}/>
        </Switch>
      
    </div>
    
  );
}

export default App;
