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
                        I'm Hemant Singh Manral, a versatile Full Stack Developer with a passion for solving complex problems across diverse tech stacks.
                        My ability to adapt to new technologies and tackle challenging projects sets me apart. 
                        From enhancing system resiliency to developing innovative applications, my work demonstrates my commitment to excellence.
                    </p>
                </div>
            </div>
            <SocialLink/>
        </div>
    )
}

export default About;