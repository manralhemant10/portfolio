import React from  'react'
import parse from 'html-react-parser'

const ExperienceSlider = (dis)=>{
    //const {title, company, duration,task, desc} = dis.dis
    const {title, company, duration, desc} = dis.dis
   return(      
        <div className="ExperienceInner">
            <h1 >{title} at {company}</h1>
            <p ><span>Duration: </span><br/>{duration}</p>
            {/*<p><span>Task: </span><br/>{task}</p>*/}
            <p className='expDesc'><span>Description: </span><br/>{parse(desc)}</p>
            <p id="whichSlide">{`${dis.curCount+1}/${dis.total}`}</p>
        </div>
    )
}

export default ExperienceSlider