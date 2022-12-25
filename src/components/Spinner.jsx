import React from 'react'
import loader from '../images/loadingGif.gif'


const Spinner = ()=>{
    return (
        <div className='loaderMain'>
          <img src={loader} alt=""/>
        </div>
    )
}

export default Spinner