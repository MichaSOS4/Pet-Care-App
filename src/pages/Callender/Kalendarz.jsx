import styles from './Kalendarz.module.css'
import {useState, useRef, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import KalendarzBoard from '../../components/KalendarzBoard/KalendarzBoard'

function Kalendarz(props) {
    const nav = useRef(null)
    const laterContent = useRef(null)
    const [navText, setNavText] = useState('Kalendarz')


    useEffect(()=>{
        if(nav.current && laterContent.current){
            setTimeout(()=>{
            const navHeight = nav.current.offSetHeight;
            laterContent.current.style.marginTop = `${navHeight}px`
            },100)
            
        }
        
    },[navText])
return(
    
    <div className = {styles.wrapper}>
        
    <div>
    <Navbar ref = {nav}  title = {navText}></Navbar>
    </div>
   
        <div>
        <KalendarzBoard handlePushEvent = {props.handlePushEvent} notes = {props.notes} setNotes = {props.setNotes}  handlePushNote = {props.handlePushNote} events = {props.events} ref = {laterContent} ></KalendarzBoard>
         </div>
    
    </div>
    
)    
}

export default Kalendarz