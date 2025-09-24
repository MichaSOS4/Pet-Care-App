import styles from './Notatki.module.css'
import { useState,useRef,useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Plus,Undo2,Save } from 'lucide-react'
function Notatki (props){
const [navText,setNavText] = useState(props.notes.length ? `${localStorage.getItem('user')} oto twoje notatki.` : `${localStorage.getItem('user')} nie masz żadnych notatek, czy chcesz je dodać ?`)
const [flag,setFlag] = useState(true)
const nav = useRef(null)
const laterContent = useRef(null)
const dateInput = useRef(null)
const note = useRef(null)


const changeToForm = ()=>{
    setFlag(prevFlag => prevFlag = false)
}
const back = ()=>{
    setFlag(prevFlag => prevFlag = true)
    
}

const saveNote = (e)=>{
    e.preventDefault()
    if( note.current.value,
     dateInput.current.value){

const newNote = {
    note: note.current.value,
    date: dateInput.current.value
}
props.handlePushNote(newNote)
note.current.value = ''
dateInput.current.value = ''

}
setFlag(prevFlag => prevFlag = true)
}


useEffect(()=>{
    if(nav){
    const navHeight = nav.current.offsetHeight
    laterContent.current.style.marginTop = navHeight  + 'px'
    }
},[navText])


    return (
        <div className={styles.notesWrapper}>
            <Navbar ref ={nav} title = {navText}></Navbar>
            <div className={styles.laterContent} ref = {laterContent}>
                {props.notes.length && flag ?
                <div className={styles.btnNotesWrapper}>
                    <button onClick={changeToForm} className={styles.addNotes}><Plus />Dodaj notatkę</button>
                 <ul className={styles.notes}>
                    {props.notes.map((note,idx)=>{
                        return < li key = {idx} className={styles.note}><b>Data:</b> {note.date}  <br />
                                                                         
                                                                      <b> Treść:</b>{note.note}         </li>
                    })}

                </ul>
                </div> : <div className={styles.secondOption}>
                 {props.notes.length ?<button onClick={back} className={styles.back}><Undo2 />wróć</button>: null }
                <div className={styles.formWrapper}>
                   
                    
                    <form className={styles.formNotes} >
                        <input className={styles.dateInput} ref = {dateInput} type="date" />
                        <textarea className={styles.textInput} ref = {note} name="text" id="text" placeholder='treść notatki'>

                        </textarea>
                        <button onClick={(e)=>{saveNote(e)}} className={styles.saveNote}><Save />Zapisz notatkę</button>
                    </form>
                    
                    
                </div>
                </div>}
            </div>
        </div>
    )
}
export default Notatki