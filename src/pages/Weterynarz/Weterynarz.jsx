import { useState, useEffect, useRef} from "react"
import WeterynarzForm from "../../components/WeterynarzForm/WeterynarzForm"
import Navbar from "../../components/Navbar/Navbar"
import { Form } from "react-router-dom"
import VisitList from "../../components/VisitList/VisitList"
import styles from './Weterynarz.module.css'
import { useLocation } from "react-router-dom"
import { Plus } from "lucide-react"
function Weterynarz(props){
     const location = useLocation()
   const [weterynarzDate,setWeterynarzDate] = useState(location.state? location.state.date : '')
    
    const [arr, setArr] = useState([])
    const [navText,setNavText] = useState(` ${arr.length ? `Oto wszystkie wizyty ${localStorage.getItem('animalName')}`: `${localStorage.getItem('user')} nie masz zanotowanych żadnych wizyt, czy chcesz je dodać ?`}`)
    const [flag,setFlag] = useState(true)
    const nav = useRef(null)
    const laterContent = useRef(null)
    
    
    const handleSaveVisit = (visit) =>{
        setArr([visit,...arr])
    }

    const changeToForm = ()=>{
        setFlag(prevFlag => prevFlag = false)
        setNavText('Dodawanie nowej wizyty ');

    }

    useEffect(()=>{
        if(nav.current&& laterContent.current){
            
                const navHeight = nav.current.offsetHeight;
            laterContent.current.style.marginTop = `${navHeight + 30}px`;
            
            
        }
    },[navText])


    useEffect(()=>{
        const savedVisits = JSON.parse(localStorage.getItem('visits')) || [];
        
        setArr(savedVisits);
        if(savedVisits.length){
            setNavText(`Oto wszystkie wizyty ${localStorage.getItem('animalName')}`)
        }
        
        
    },[])
    

    
        useEffect(() => {
    localStorage.setItem('visits', JSON.stringify(arr));
    if (!arr.length) {
        setFlag(false);
        setNavText(`${localStorage.getItem('user')} nie masz zanotowanych żadnych wizyt, czy chcesz je dodać ?`);
    } else {
        setFlag(true);
        setNavText(`Oto wszystkie wizyty ${localStorage.getItem('animalName')}`);
    }
    
    
    }, [arr]);

     const handleDeleteVisit = (index,date,key) => {     
         const newArr = arr.filter((_, i) => i !== index);
         setArr(newArr);
         console.log(key)
         const newArrEvents = props.events.filter((event)=>{
           return event.key !== key
         })
         props.setEvents(newArrEvents)
         

     }
    
   
    return(
        <div className= {styles.mainDiv}>
            <Navbar ref = {nav} title = {navText}></Navbar>
        

        <div ref = {laterContent}  >
            {flag ? <div className= {styles.btnAndListWrapper}>
                
                    <button className={styles.addVisitBtn} onClick = {changeToForm}><Plus />Dodaj wizytę</button>
                
                <VisitList setSum = {props.setSum} sum = {props.sum} typeOfVisit = 'wizyt' line1 = {'Miejsce'} line2 = {'Data'} line3 = {'Cena'} line4 = {'Notatka'} handleDeleteVisit = {handleDeleteVisit}  setArr = {setArr} visits = {arr}></VisitList> 
                </div> : 
                    <WeterynarzForm  weterynarzDate = {weterynarzDate ? weterynarzDate : null } handlePushEvent = {props.handlePushEvent} typeOfMoney = {'Wizyta weterynaryjna'}  sum = {props.sum} handlePushToSum = {props.handlePushToSum} inputType = {'date'} submitBtnText = {'Zapisz wizytę'} note = {'notatka'} price = {'Cena wizyty'} reason = {'Data wizyty'} place = {'Miejsce wizyty'} handleSaveVisit = {handleSaveVisit} setNavText= {setNavText} setArr = {setArr} arr = {arr} setFlag = {setFlag}></WeterynarzForm>
                
                }
       
        </div>

        </div>
    )
}
export default Weterynarz