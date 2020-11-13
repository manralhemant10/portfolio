import React from 'react'
import CategoryPro from './CategoryPro'
import ProjectObj from './ProjectObj'

const obj = Object.entries(ProjectObj)

const Projects =()=>{
    const headings = Object.keys(ProjectObj)
   
    return(
        <div className="ProjectsContainer">
            
            {
                headings.map((val,index)=>{
                    return(
                    <>
                        <div className="proHead">
                            <h1>{obj[index][0]}</h1>
                        </div>
                        <CategoryPro
                            key={index}
                            ind={index}
                        />
                    </>
                    )
                })
            }
                     
        </div>
    )

}

export default Projects