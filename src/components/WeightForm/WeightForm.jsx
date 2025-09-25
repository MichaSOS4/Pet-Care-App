 import styles from './WeightForm.module.css'
 import { useState, useRef, useEffect } from 'react'
 import { Save,Undo2 } from 'lucide-react'
function WeightForm(props) {
    
    

    const time = useRef(null)
    const kg = useRef(null)
    const saveWeight = (e) =>{
        e.preventDefault()
        if(time.current.value&& kg.current.value){
        
            const key = Math.random()
            
            const eventDatas = {
            date: time.current.value,
            type: 'Ważenie pupila',
            key:key
        }
        props.handlePushEvent(eventDatas)



        const weightData = {
            time: time.current.value,
            kg: kg.current.value,
            type: 'Ważenie'
        }
        props.handleSaveWeight(weightData)
        time.current.value = ''
        kg.current.value = ''

    }
    
    }
    const back = (e)=>{
        e.preventDefault()
        props.setFlag(prevFlag=>prevFlag = true)
        
    }



    return(<div className={styles.wrapper}>
    
        <form className= {styles.wetForm}  >
            <button className={styles.back} onClick={(e)=>{back(e)}}><Undo2 />wstecz</button>
            <input ref = {time} className={styles.weightForminput} type="date" name="time" id="" placeholder="Data ważenia" defaultValue={props.wagaDate ? `${props.wagaDate.year}-${props.wagaDate.month < 10 ? '0'+ props.wagaDate.month : props.wagaDate.month}-${props.wagaDate.day < 10 ? '0' + props.wagaDate.day : props.wagaDate.day}` : null} />
            <input ref = {kg} className={styles.weightForminput} type="number" name="kg" id="" placeholder="Waga w kilogramach" />
            <button onClick={(e)=>{saveWeight(e)}} className={styles.saveWeightBtn}><Save />Zapisz ważenie {localStorage.getItem('animalName')}</button>
        </form>
        </div>
    )
}
export default WeightForm;