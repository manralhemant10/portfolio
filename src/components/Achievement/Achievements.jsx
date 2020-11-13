import React from 'react'
import AchievementCategory from './AchievementCategory'
import AchievementObj from './AchievementObj'

const Achievements =()=>{
    const headings = Object.keys(AchievementObj)

    return(
        <div className="AchievementContainer">
            {
                headings.map((val,index)=>{
                    return(
                    <>
                        <AchievementCategory
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

export default Achievements