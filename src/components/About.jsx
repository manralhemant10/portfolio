import React from 'react';
import dp from '../images/dp.jpg';
import SocialLink from './SocialLink';

const About = () => (
  <div className="aboutMain">
    <div className="imgParaAbout">
      <div className="aboutImg">
        <img src={dp} alt="Hemant Singh Manral" />
        <p><q>Develop as a Hacker.<br/>Hack as a Developer</q></p>
      </div>
      <div className="aboutPara">
        <p>Hello <span className="hiemoji" role="img" aria-label="waving hand">👋</span>,<br/>
          I'm Hemant Singh Manral, a full-stack software engineer specializing in Java, Spring Boot,
          enterprise banking platforms, and secure, high-throughput data processing.
          At BNY, I own critical market-data ingestion workflows and build AI-powered security
          automation used across enterprise applications. My work spans backend architecture,
          platform modernization, vulnerability remediation, and practical developer tooling.
        </p>
      </div>
    </div>
    <SocialLink/>
  </div>
);
export default About;
