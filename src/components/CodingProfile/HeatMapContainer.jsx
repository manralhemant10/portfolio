import React,{useState} from'react' 
import { Heatmap } from "contribution-heatmap"

const dayOfYear = date =>{
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
} 
const HeatMapContainer = (props)=>{
   const {yearsToList, heatData} = props
   const currDate = new Date()
   const [year, setYear] = useState(currDate.getFullYear().toString())
   const [squareNumber,setSquareNumber] = useState(365)
   const onYearChange = (e)=>{
    setYear(e.target.value)
    // if(year===currDate.getFullYear().toString()){
    //     setSquareNumber(dayOfYear(currDate))
    // }
    // else{
    //     setSquareNumber(365)
    // }
   }
    return (
        <div className='heatMapContainer'>
            <label for="years">Choose a year: </label>
            <select className='dropDown' name="yearsDD" id="yearsDD" value={year} onChange={onYearChange}>
            {
                yearsToList.map((year)=>{
                    return <option className='dropDown' value={year} >{year}</option>
                })
            }
            </select>
            <div className='heatmapDivWrapper'>
            <Heatmap 
                colour={['#232423','#2ec730', '#179c19', '#0b700d', '#024d03', '#013b01']} 
                squareNumber={squareNumber} 
                count={heatData[year]}
                squareGap='4px'
                squareSize='15px'
            />
            </div>
        </div>
    )
}

export default HeatMapContainer