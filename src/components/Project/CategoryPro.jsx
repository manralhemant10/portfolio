import React,{ useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectObj from './ProjectObj'

const CategoryPro =(props)=>{
    const obj = Object.entries(ProjectObj)
    var checklen = obj[props.ind][1].length
    var temparr=[]
    if(checklen>3){
         temparr = [0,1,2]
         checklen = 3
    }
    else{
        for(var i=0;i<checklen;i++)
            temparr.push(i)
    }

    const [currele, setCurrele] = useState(temparr) 

    
    const nextPro=(e)=>{
        console.log(e.target)
        const tempstr = e.target.id
        const newid = tempstr.substr(4)
        const len = obj[newid][1].length
        
        if(currele[currele.length-1]===len-1)
            return
        
        setCurrele((prev)=>{
            const updprev = []
            for(var i=0;i<checklen;i++){
                if(prev[i]+checklen<len)
                    updprev[i] = prev[i]+checklen
                else
                    break
            }
            return updprev
        })

    
    }
    const prevPro=(e)=>{
        const tempstr = e.target.id
        const newid = tempstr.substr(4)

        const len = obj[newid][1].length
        
        if(currele[0]===0)
            return
        var newlen=0
        if(currele.length<3)
             newlen = len-currele.length-1
        else
             newlen = currele[0]-1

        setCurrele((prev)=>
           {
            console.log(currele[0])
            const updprev = []
            var j=2
            for(var i=newlen;i>newlen-3;i--){
                updprev[j] = i
                j--;
            }
            return updprev
           }
        )
    
    }
 
    return(
        <div className="ProjectCategoryContainer">
              <button id={`prev${props.ind}`} className="prevPro" onClick={prevPro}>❬</button> 
            {
                currele.map((val,index)=>{
                    return(
                        <ProjectCard link={obj[props.ind][1][val].linkPro} title={obj[props.ind][1][val].title} img = {obj[props.ind][1][val].img} desc={obj[props.ind][1][val].desc}/>
                    )
                })
            }
            <button id={`next${props.ind}`} className="nextPro" onClick={nextPro}>❭</button>
        </div>
    )

}

export default CategoryPro