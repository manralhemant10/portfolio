import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
const SocialLink=()=>{

    //const [socialshow,Setshowsocial] = useState(0)
    //const showHandles = ()=>Setshowsocial(1)
    //const hideHandles = ()=>socialshow?Setshowsocial(0):null
    
    const stylesize=
    {
        smallsize:{
            width:54,
            height:54
            
        }

    }

    return(
        <>
            <div  className="socialLinks"> 
                <div  className="socialUpwards">
                    <a  href="https://www.linkedin.com/in/hemant-singh-manral-7a33a6174/"><LinkedInIcon/></a>
                    <a  href="https://github.com/manralhemant10"><GitHubIcon/></a>
                </div>
                <AddCircleOutlinedIcon className="socialBtn" style={stylesize.smallsize}/>

            </div>

        </>
    )
}

export default SocialLink