import React from 'react'
import dp from '../images/dp.jpg'


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
                        I am Hemant, a Full Stack Developer enthusiast with an experience 
                        in Bug hunting for more then a year,
                        I am very much passionate of taking up new Developing Challenges and trying out new things that revolve around some technology.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;