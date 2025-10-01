import { useState, useRef, useEffect } from "react"
import styles from './WeterynarzForm.module.css'
import { Undo2,Save } from "lucide-react"
function WeterynarzForm (props){
const price = useRef(null)
const reason = useRef(null)
const place = useRef(null)
const note = useRef(null)
const [incomingDate,setIncomingDate] = useState('')




useEffect(()=>{
            if(props.szczepieniaDate){
            const day = props.szczepieniaDate.day
            const month = props.szczepieniaDate.month 
            const year = props.szczepieniaDate.year
            setIncomingDate({year:year,
                            month: month,
                            day: day
            })
        }else if(props.weterynarzDate){
            const day = props.weterynarzDate.day
            const month = props.weterynarzDate.month 
            const year = props.weterynarzDate.year
            setIncomingDate({year:year,
                            month: month,
                            day: day
            })
        }
        
        },[])

     const saveToLocal = (e)=>{
    e.preventDefault()
    const key = Math.random()
    if(price.current.value&& reason.current.value&& place.current.value){
        props.setFlag(true)
        props.setNavText(`Oto wszystkie wizyty ${localStorage.getItem('animalName')}`)
        console.log(typeof  parseFloat(price.current.value) )
        const incomingPrice = parseFloat(price.current.value).toFixed(2)
        const visit  = {
            place: place.current.value,
            reason: reason.current.value,
            price: incomingPrice,
            note: note.current.value,
            key : key
        }
        const eventDatas = {
            date: reason.current.value,
            type: props.typeOfMoney,
            key:key
        }
        const incomingSum = {
            type: props.typeOfMoney,
            money: Number(price.current.value)
        }
        // props.handlePushToSum(`Typ : ${props.typeOfMoney} Kwota : ${Number(price.current.value)}`)
        props.handlePushToSum(incomingSum,incomingSum.money)
        props.handlePushEvent(eventDatas)
        
        props.handleSaveVisit(visit)
        price.current.value = ''
        place.current.value = ''
        reason.current.value = ''
        note.current.value = ''
       


        }
       
        
    
   
    }
    const back = (e)=>{
        e.preventDefault()
        props.setFlag(prevFlag=>prevFlag = true)
        
    }


    return(
<>
<form className= {styles.wetForm} > 
            <button className={styles.back} onClick={(e)=>{back(e)}}> <Undo2 /></button> 
            <input className= {styles.wetForminput} ref = {place} type="text"  placeholder={props.place}/>
            <input className= {styles.wetForminput} ref = {reason} type={props.inputType} defaultValue={incomingDate? `${incomingDate.year}-${incomingDate.month < 10 ? '0' + incomingDate.month : incomingDate.month }-${incomingDate.day < 10 ? '0' + incomingDate.day : incomingDate.day}` : ''} />
            <input className= {styles.wetForminput} ref = {price} type="number"  placeholder={props.price}/>
            <input className= {styles.wetForminput} ref = {note} type="text"  placeholder={props.note}/>
            <button className= {styles.saveVisitBtn} onClick={(e)=>{saveToLocal(e)}}><Save />{props.submitBtnText}</button>
        </form>
</>
    )
}
export default WeterynarzForm