import React from 'react'
import Skillbar from './Skillbar'
import SkillObj from './SkillObj'


const SkillCategory =(props)=>{
    const obj = Object.entries(SkillObj)
    const catObj = obj[props.ind][1]
    return(
        
        <>
            <h1 className="SkillCatTitle">{obj[props.ind][0]}</h1>
            <div className="SkillCategoryDiv"> 
                {
                catObj.map((val,index)=>{
                    return(
                        <Skillbar key={index} skillName={val.name} skillPercent={val.percent} />
                    )
                })}
            </div>
            

        </>
    )

}

export default SkillCategory