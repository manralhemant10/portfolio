import React from 'react'
import dp from '../images/dp.jpg'
import SocialLink from './SocialLink';


const About=()=>{

    return(
        <div className="aboutMain">
            <div className="imgParaAbout">
                <div className="aboutImg">
                    <img src={dp} alt=""></img>
                    <p ><q>Develop as a Hacker.<br/>Hack as a Developer</q></p>
                </div>
                <div className="aboutPara">
                    <p>
                        Hello <span className="hiemoji">👋</span>,<br/>
                        I am Hemant Singh Manral, currently working in Oracle as a Full Stack Developer with keen interest 
                        in React.js and Node.js, I have hands-on experience of these technologies and also 
                        working on personal projects using the same.
                        Apart from this I have a good experience as a Bug Bounty Hunter, so My development
                        always have a
                        perspective of Security in it.  
                        
                    </p>
                </div>
            </div>
            <SocialLink/>
        </div>
    )
}

export default About;