import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';

const Styles={
    smallsize:{
        height:35,
    }
}
const ProjectCard = (props)=>{
    return(
        <div className="projCard">
            <h1>{props.title}</h1>   
                <a href={props.link} title="Click to visit the repo" target="_blank">
                    <div className="Repo">
                        <GitHubIcon style={Styles.smallsize} />
                        <span>Repo</span>
                    </div>
                </a>
            <p>{props.desc}</p>
        </div>
    )
}

export default ProjectCard