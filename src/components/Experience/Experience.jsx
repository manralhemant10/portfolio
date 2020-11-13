import React from 'react'
import ExperienceSlider from './ExperienceSlider'
import ExperienceObj from './ExperienceObj'
import { useState } from 'react'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

const Experience=()=>{
    
    const [count,setCount] = useState(0)
    const [show,setShow] = useState(ExperienceObj.exp[count])
    const len = ExperienceObj.exp.length
    const nextB = ()=>{
        setCount((count+1)%len)
        setShow(ExperienceObj.exp[(count+1)%len])
    }
    const prevB = ()=>{
        setCount(((count-1)+len)%len)
        setShow(ExperienceObj.exp[((count-1)+len)%len])
    }
    
   
    return(
        <>
        
        <div className="ExperienceMain">
            <div className="prevBtn">
                <NavigateNextOutlinedIcon onClick={prevB} />
            </div>
            <div className="ExperienceOuter">
                    <ExperienceSlider
                        dis = {show}
                        total = {ExperienceObj.exp.length}
                        curCount = {count}
                    />
            </div>
            <div className="nextBtn">
                <NavigateNextOutlinedIcon onClick={nextB} />
            </div>
       </div>
       </>
    )
}

export default Experience