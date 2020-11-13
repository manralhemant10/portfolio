import React,{ useState } from 'react'
import AchievementCard from './AchievementCard'
import AchievementObj from './AchievementObj'


const AchievementCategory =(props)=>{
    const obj = Object.entries(AchievementObj)
    var checklenAch = obj[props.ind][1].length
    var temparrach=[]
    if(checklenAch>3){
         temparrach = [0,1,2,3,4,5]
         checklenAch = 6
    }
    else{
        for(var i=0;i<checklenAch;i++)
            temparrach.push(i)
    }
    const [showarr,setShowarr]=useState(temparrach)
    
    const moreAchievement=(e)=>{
        const tempstr = e.target.id
        const newid = tempstr.substr(4)
        
        const len = obj[newid][1].length

        if(showarr[showarr.length-1]===len-1)
            return
        var moreExp =[]
        var more;
        setShowarr((prev)=>{
            if(len - prev.length <6)
                 more = len - prev.length
            else
                 more = 6

            for(var i=0;i<more;i++){
                moreExp.push(prev.length+i)
            }
            return [...prev,...moreExp]
        })
    
    }
    const lessAchievement=(e)=>{
        
        if(showarr.length<=6)
            return
        var less;
        setShowarr((prev)=>{
            const prevlen = prev.length
            if(prevlen%6===0)
                 less = prevlen-6
            else
                 less = prevlen-(prevlen%6)
            const newArr = [...prev]
            newArr.splice(less)
    
            return newArr
        })
    }

    return(
        <>
       
 
        <div className="Achievementhead">
            <h1>{obj[props.ind][0]}</h1>
        </div>
        <div className="AchievementCategoryParent">
            <div className="AchievementCategory">
                {
                showarr.map((val,index)=>{
                    return(
                        <AchievementCard link={obj[props.ind][1][val].hoflink}  title={obj[props.ind][1][val].company_name} img = {obj[props.ind][1][val].logo} />
                    )
                })}
            </div>       
            <div className="AchievementBtnDiv">
                <button className="Achievementmorebtn" id={ `more${props.ind}` } onClick={moreAchievement}>More</button>
                <button className="Achievementlessbtn" id={ `less${props.ind}` } onClick={lessAchievement}>Less</button>
            </div>
        </div>
        </>
    )

}

export default AchievementCategory