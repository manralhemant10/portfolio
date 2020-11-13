import React from 'react';
import {Switch,Route } from 'react-router-dom';
import Nav from './components/Nav'
import About from './components/About'
import Skills from './components/Skill/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Project/Projects';
import Achievements from './components/Achievement/Achievements';
import SocialLink from './components/SocialLink';

function App() {
  return (
   <div className="mainDiv">
      <Nav/>
        <Switch>
          <Route exact path="/" component ={About}/>
          <Route  path="/skills" component={Skills}/>
          <Route  path="/experience" component={Experience}/>
          <Route  path="/projects" component={Projects}/>
          <Route  path="/achievements" component={Achievements}/>
        </Switch>
      <SocialLink/>
    </div>
    
  );
}

export default App;
