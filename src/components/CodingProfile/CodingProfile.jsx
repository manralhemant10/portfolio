import React,{useEffect, useState} from 'react'
import axios from 'axios'
import constants from '../../Constants'
import HeatMapContainer from './HeatMapContainer'
import Spinner from '../Spinner'

const getExternalApiData = (url,body)=>{
    if(body){
        return axios.post(constants.CORS_PROXY+"/?url="+Buffer.from(url).toString('base64'),body)
        .then((res)=>{
            return res.data
        })
        .catch(()=>{throw new Error(url)})
    }else{
        return axios.get(constants.CORS_PROXY+"/?url="+Buffer.from(url).toString('base64'))
        .then((res)=>{
            return res.data
        })
        .catch(()=>{throw new Error(url)})
    }
 
}

const convertTag = (tagName)=>{
    let convertedTag = ""
    for(let ch of tagName){
        if(!(ch>='a' && ch<='z') && !(ch>='A' && ch<='Z'))continue;
        convertedTag+=ch.toLowerCase()
    }
    if(convertedTag in constants.TAGS_TO_DISPLAY)
    {
        return constants.TAGS_TO_DISPLAY[convertedTag]
    }else{
        return constants.TAGS_TO_DISPLAY['miscellaneous']
    }
}

const dayOfYear = date =>{
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}
const createHeatData = (dt,cnt,heatDataTemp )=>{
    
                const dateObj = new Date(dt)
                if(dateObj < new Date("01-01-2020"))return
                const heatYear = dateObj.getFullYear()
                if( !(heatYear in heatDataTemp)){
                    heatDataTemp[heatYear] = new Array(365).fill(0);
                }
                heatDataTemp[heatYear][dayOfYear(dateObj)-1]+=cnt
}

const CodingProfile=()=>{   

    const heatDataTemp = {}
    const leetUserProfileQuery = {"query":"query getUserProfile($username: String!) { allQuestionsCount { difficulty count } matchedUser(username: $username) { contributions { points } profile { reputation ranking } submissionCalendar submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } } } } ","variables":{"username":`${constants.LEETCODE_USER}`}}
    const leetSkillStatsQuery = {"query":"\n    query skillStats($username: String!) {\n  matchedUser(username: $username) {\n    tagProblemCounts {\n      advanced {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      intermediate {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      fundamental {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n    }\n  }\n}\n    ","variables":{"username":`${constants.LEETCODE_USER}`}}
    const leetYearWiseHeats = (yearparam)=>{
        return {"query":"\n    query userProfileCalendar($username: String!, $year: Int) {\n  matchedUser(username: $username) {\n    userCalendar(year: $year) {\n      activeYears\n      streak\n      totalActiveDays\n      dccBadges {\n        timestamp\n        badge {\n          name\n          icon\n        }\n      }\n      submissionCalendar\n    }\n  }\n}\n    ","variables":{"username":`${constants.LEETCODE_USER}`,"year":`${yearparam}`}}

    }
    const [loading, setLoading] = useState(true);
    const [totalSolvedQues,setTotalSolvedQues]= useState(0)
    const [solvQuesPlatWise,setSolvQuesPlatWise]= useState({})
    const [heatData,setHeatData] = useState(new Array(365))
    const [yearsToList, setYearsToList] = useState([])
    const [tagMapDisp, setTagMapDisp] = useState(new Map())
    const [maxStreak,setMaxStreak] = useState(0)

    useEffect(()=>{
        const getAllCodingData  = async()=>{
            try{
                let totalSolved = 0,
                platWiseQues = {
                    LeetCode: 0
                },
                platWiseQuesOther={},
                tagMap = new Map()
                let leetuserPro = await getExternalApiData(constants.LEETCODE_GRAPHQL,leetUserProfileQuery)
                totalSolved += leetuserPro.data.matchedUser.submitStats.acSubmissionNum[0].count
                platWiseQues.LeetCode=totalSolved
                //setTotalSolvedQues(totalSolved)
                let stopStalkRes = await getExternalApiData(constants.STOPSTALK.USER_STATS_URL)
                totalSolved += stopStalkRes.solved_problems_count
                for(const [platName, totSol] of Object.entries(stopStalkRes.solved_counts)){
                    if(totSol!==0){
                        platWiseQues[platName] = totSol
                    }
                }
                setTotalSolvedQues(totalSolved)
                setSolvQuesPlatWise(Object.fromEntries(
                    Object.entries(platWiseQues).sort(([,a],[,b]) => b-a)
                ))
                
            
                let leetSkill = await getExternalApiData(constants.LEETCODE_GRAPHQL,leetSkillStatsQuery)
                leetSkill.data.matchedUser.tagProblemCounts.advanced.forEach((tagsObj)=>{
                    let tagname = convertTag(tagsObj.tagName)
                    let tagExist = tagMap.get(tagname)
                    if(tagExist){
                        tagMap.set(tagname,tagExist+tagsObj.problemsSolved)

                    }else{
                        tagMap.set(tagname,tagsObj.problemsSolved)
                    }
    
                })
                leetSkill.data.matchedUser.tagProblemCounts.intermediate.forEach((tagsObj)=>{
                    let tagname = convertTag(tagsObj.tagName)
                    let tagExist = tagMap.get(tagname)
                    if(tagExist){
                        tagMap.set(tagname,tagExist+tagsObj.problemsSolved)

                    }else{
                        tagMap.set(tagname,tagsObj.problemsSolved)
                    }
    
                })
                leetSkill.data.matchedUser.tagProblemCounts.fundamental.forEach((tagsObj)=>{
                    let tagname = convertTag(tagsObj.tagName)
                    let tagExist = tagMap.get(tagname)
                    if(tagExist){
                        tagMap.set(tagname,tagExist+tagsObj.problemsSolved)

                    }else{
                        tagMap.set(tagname,tagsObj.problemsSolved)
                    }
    
                })

                let stopStalkTagsRes = await getExternalApiData(constants.STOPSTALK.TAGS_URL)
                for(const tags in stopStalkTagsRes.solved_problems){
                        let ssTagsArr= stopStalkTagsRes.solved_problems[tags]
                        let tagname = convertTag(tags)
                        let tagExist = tagMap.get(tagname)
                        if(tagname==="Miscellaneous")
                        if(tagExist){
                            tagMap.set(tagname,tagExist+ssTagsArr.length)

                        }else{
                            tagMap.set(tagname,ssTagsArr.length)
                        }
    
                
                }
                for(const dt in stopStalkRes.calendar_data){
                    createHeatData(dt, stopStalkRes.calendar_data[dt].AC, heatDataTemp)
                }
                let yearsToListTemp=[]

                let stYear = "2020", curYear = (new Date()).getFullYear().toString();
                for(let i = stYear;i<=curYear;i++){
                    yearsToListTemp.push(i);
                }
                for(const year of yearsToListTemp){
                    let res = await getExternalApiData(constants.LEETCODE_GRAPHQL,leetYearWiseHeats(year))
                    let calObj = JSON.parse(res.data.matchedUser.userCalendar.submissionCalendar)
                    for(const calTimestamp in calObj){
                        createHeatData(calTimestamp*1000, parseInt(calObj[calTimestamp]), heatDataTemp)
                    
                    }
                }
            
                let streakCnt=0,maxSt=0
                for(const year of yearsToListTemp){
                    for(const day of heatDataTemp[year]){
                        if(day===0){
                            maxSt = Math.max(maxSt, streakCnt)
                            streakCnt=0
                        }else{
                            streakCnt++
                        }
                    }
                }
                setMaxStreak(maxSt)
                setHeatData({...heatDataTemp})
                setYearsToList([...yearsToListTemp])
                setTagMapDisp(new Map(tagMap))
                setLoading(false)
            }
            catch(err){
                if(err===constants.LEETCODE_GRAPHQL){

                }else if(err===constants.LEETCODE_USER){

                }
            }   
        }
        getAllCodingData()
    },[])
    return(
        <>
        { loading?(<Spinner/>):null}
                <div className='codingContainer'>
            <div className='prosummContainer'>
                <div className='totalContainer'>
                    <div className='keyValueContainer'>
                        <div className='keyHeading'>Problems solved</div>
                        <div className='valueHeading'>{totalSolvedQues}</div>
                    </div>
                    <div className='keyValueContainer'>
                        <div className='keyHeading'>Max Day Streak</div>
                        <div className='valueHeading'>{maxStreak}</div>
                    </div>
                </div>
                <div className='platContainer'>
                    {
                        Object.keys(solvQuesPlatWise).map((plat)=>{
                            return (
                                <>
                                <div className='keyValueContainer' key={plat} id ={plat}>
                                    <div className='keyHeading'>{plat}</div>
                                    <div className='valueHeading'>{solvQuesPlatWise[plat]}</div>
                                </div>                              
                                          
                                </>
                            )
                        })                
                    }                 
                </div>
                <HeatMapContainer yearsToList={yearsToList} heatData={heatData}/>

            </div>
            <div className='tagsContainer'>
            {
                
                [...tagMapDisp.keys()].map((tagname)=>{
                    return (
                    <div className='keyValueContainer'>
                        <div className='keyHeading'>{tagname} <span className='valueHeading'>({tagMapDisp.get(tagname)})</span></div>
                    </div>)
                })
            }
            </div>
        </div>
          
        


        
       </>
    )
}

export default CodingProfile