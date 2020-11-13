import React from 'react'
import SkillObj from '../Skill/SkillObj'
import SkillCategory from '../Skill/SkillCategory'

const headings = Object.keys(SkillObj)
const Skills=()=>{
    return(
        <div className="SkillsContainer">
            <div>
            {
                headings.map((val,index)=>{
                    return(
                    <>
                        <SkillCategory
                            key={index}
                            ind={index}
                        />
                    </>
                    )
                })
            }
            </div>
                     
        </div>
    )
}

export default Skills;