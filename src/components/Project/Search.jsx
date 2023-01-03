import React,{ useState} from 'react'
import SelectedtagLook from './SelectedtagLook'
import constants from '../../Constants'

const Search = (props)=>{
    const [inputvalue, setInputvalue] = useState("")
    const [tags,setTags] = useState(constants.techTags)
    const [showSelectedTags, setShowSelectedTags]=useState([])
    
    const inputChange=(event)=>{
        setInputvalue(event.target.value)
    }
    const matchPrefix =(primaryStr, prefstr)=>{
        let i=0;
        if(prefstr.length>primaryStr.length)
            return false;
        else{
            while(i<prefstr.length){
                if(primaryStr[i]===prefstr[i]){
                    i++
                    continue
                }
                else
                    return false
            }
            return true
        }
        
    }
    
    const filteredSuggestions=  ()=>{
        let count=0
        const tagarr = []
        for(let val of tags){
            if(count>=5)
                break
            if(matchPrefix(val.toLowerCase(),inputvalue.toLowerCase())){
                count++;
                tagarr.push(val)
            }
        }
        return tagarr
    } 
    const dropDownSuggClicked =(e)=>{
        setInputvalue("")
        const name =e.target.textContent
        setShowSelectedTags(prev=>[...prev,name])
        props.handleFun([...showSelectedTags,name])
        
    }
    const removeTag = (deleteval)=>{
        const temparr = showSelectedTags
            let searchTerm = deleteval.slice(0, -1),
                index = -1;
            for(let i = 0, len = temparr.length; i < len; i++) {
                if (temparr[i] === searchTerm) {
                    index = i;
                    break;
                }
            }
        temparr.splice(index, 1);
        setShowSelectedTags([...temparr])
        props.handleFun([...temparr])

    }
    return(
        <>
        <div className="searchntagsContainer">
                <h1 className="headFiltertag">Filter by Tech</h1>
                <div className="searchnsuggContainer">
                    <input list="tags" value={inputvalue} onChange={inputChange} placeholder="Search tags..."/>
                    {
                        inputvalue.length>0?
                        (<ul className="suggestionsContainer">
                            {
                                inputvalue?
                                filteredSuggestions().map((val,index)=>{
                                        return (
                                            <li key={`val${index}`} id={`dropDownSugg${index}`} onClick={dropDownSuggClicked} value={val}>{val}</li>
                                        )
                                    })
                                :
                                null

                            }
                        </ul>):null
                    }
                </div>
                    {
                         showSelectedTags.length>0 && inputvalue.length===0?(
                        <div className="selectedTagsContainer">
                            {
                                showSelectedTags.map((val)=>{
                                    return <SelectedtagLook tagName={val} handleFun={removeTag}/>
                                })
                            }
                        </div>
                        ):null
                    }
                   
        </div>
    </>
    )

}

export default Search