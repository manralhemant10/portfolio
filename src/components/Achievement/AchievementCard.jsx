import React from 'react'

const AchievementCard = (props)=>{
    return(
        <>
        <div className="AchievementChild">
            <h1>{props.title}</h1>
            <a href={props.link} target="_blank" rel="noopener noreferrer">
                <img src={props.img} alt=""/>
            </a>
        </div>
        </>
    )
}

export default AchievementCard