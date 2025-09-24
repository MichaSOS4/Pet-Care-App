 import styles from './CallenderEvent.module.css'
 import { Link } from 'react-router-dom'
 import { useState, useRef } from 'react'
 import { Save,Syringe,BriefcaseMedical,Weight } from 'lucide-react'
 
 function CallenderEvent (props){
    const noteInput = useRef(null)
    const dateNoteInput = useRef(null)
    const [flag,setFlag] = useState(true)
    const changeToAddEventScreen = ()=>{
        setFlag(false)
    }
    const saveNote = ()=>{
        const key = Math.random()
        const note = {
            note: noteInput.current.value,
            date: dateNoteInput.current.value
        }
        const eventDatas = {
            date: dateNoteInput.current.value,
            value:noteInput.current.value,
            type: 'Notatka',
            key:key
        }
        props.handlePushNote(note)
        props.handlePushEvent(eventDatas)

        noteInput.current.value = ''
        dateNoteInput.current.value = ''
    }
    console.log(props.choosenDate)

    const backToBoard = ()=>{
        props.setEventActive(true)
    }
    return(



        <>
        
        <div className={styles.eventWrapper}>
            <button onClick={backToBoard} className={styles.back}>Wstecz</button>
        <h2 className = {styles.eventTitle}>Jakie zdażenie chcesz dodać ?</h2>
         
                <div className={styles.linkTo} ><Link state = {{date:props.choosenDate}} to= '/szczepienia'><button className = {styles.linkBtn} ><Syringe />Szczepienia</button></Link></div>
                <div className={styles.linkTo}><Link state = {{date:props.choosenDate}} to= '/weterynarz'><button className = {styles.linkBtn}><BriefcaseMedical />Weterynarz</button></Link></div>
                <div className={styles.linkTo}><Link state = {{date:props.choosenDate}} to= '/waga'><button className = {styles.linkBtn}><Weight/>Waga</button></Link></div>
                
                    <div className = {`${styles.eventNoteWrapper}  'noteEventWrapper'`}>
                        <textarea ref = {noteInput} className = {styles.eventNote} name="note" id="note" placeholder='Twoja notatka...'></textarea>
                        <input className = {styles.noteDate} ref = {dateNoteInput} type="date" name="" id="" defaultValue={props.choosenDate ? `${props.choosenDate.year}-${props.choosenDate.month < 10 ? '0' + props.choosenDate.month : props.choosenDate.month }-${props.choosenDate.day < 10 ? '0' + props.choosenDate.day : props.choosenDate.day}` : ''} />
                        <button  onClick={saveNote} className= {styles.saveNote}><Save /> Zapisz notatkę</button>
                    </div>
                
             
         
        </div>
             
        </>
    )
}

export default CallenderEvent