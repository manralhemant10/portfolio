import React,{useEffect,useState} from 'react'
import axios from 'axios'
import constants from '../../Constants'
import ProjectCard from './ProjectCard'
import Search from './Search'


//const obj = Object.entries(ProjectObj)

const Projects =()=>{
    const [projObj, setProjObj] = useState([])
    let callGitHubApi = async(tagsArr)=>{
        let tagsArrLen = tagsArr?tagsArr.length:0
        let tagsSet
        if(tagsArrLen>0){
            tagsSet = new Set(tagsArr.map((tag)=>tag.toLowerCase()))
        }
       let projObjTemp=[]
        await axios.get(constants.GITHUB_ALL).then((repoArr)=>{
            repoArr.data.forEach((repoObj)=>{
                if(tagsArrLen>0){
                    for(const topic of repoObj.topics){
                        if(tagsSet.has(topic.toLowerCase())){
                            projObjTemp.push(
                                {
                                    title:repoObj.name,
                                    desc:repoObj.description,
                                    link:repoObj.html_url,
                                    tags: repoObj.topics
                                }
                            )
                            break
                        }
                    }
                    
                }else{
                    projObjTemp.push(
                        {
                            title:repoObj.name,
                            desc:repoObj.description,
                            link:repoObj.html_url,
                            tags: repoObj.topics
                        }
                    )
                }
                
            })
                    
        }).catch(()=>{

        }).finally(()=>{
            setProjObj([...projObjTemp])
        })
    }
    useEffect(()=>{
     
        callGitHubApi();
    },[])
   
    return(
        <>
        <div>
            <Search handleFun={callGitHubApi}/>
        </div>
        <div className='projectContainer'>
            {
                projObj.map((projData)=>{
                    return (
                        <ProjectCard link={projData.link} title={projData.title} desc={projData.desc}/>
                    )
                })
            }
        </div>
        </>
    )

}

export default Projects