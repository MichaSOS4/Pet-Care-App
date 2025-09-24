import { useState , useRef, useEffect} from "react"
import Navbar from "../../components/Navbar/Navbar"
import styles from './Szczepienia.module.css'
import VisitList from "../../components/VisitList/VisitList"
import WeterynarzForm from "../../components/WeterynarzForm/WeterynarzForm"
import { useLocation } from "react-router-dom"
import { Plus } from "lucide-react"
function Szczepienia(props){
 const location = useLocation()
   const [szczepieniaDate,setSzczepianieDate] = useState(location.state? location.state.date : '')
    const [szczepienieArr, setSzczepienieArr] = useState([])
    const [navText,setNavText] = useState(` ${szczepienieArr.length ? `Oto wszystkie szczepienia ${localStorage.getItem('animalName')}`: `${localStorage.getItem('user')} nie masz zanotowanych żadnych szczepień, czy chcesz je dodać ?`}`)
    const [flag,setFlag] = useState(true)
    const nav = useRef(null)
    const laterContent = useRef(null)
    
    const handleSaveVisit = (visit) =>{
        setSzczepienieArr([visit,...szczepienieArr])
    }

    const changeToForm = ()=>{
        setFlag(prevFlag => prevFlag = false)
        setNavText('Dodawanie nowego szczepienia ');

    }
    useEffect(()=>{
        if(nav.current&& laterContent.current){
            setTimeout(()=>{
                const navHeight = nav.current.offsetHeight;
            laterContent.current.style.marginTop = `${navHeight + 30}px`;
            },10)
            
        }
    },[navText])


    useEffect(()=>{
        const savedSzczepienia = JSON.parse(localStorage.getItem('szczepienia')) || [];
        
        setSzczepienieArr(savedSzczepienia);
        setNavText(` ${savedSzczepienia.length ? `Oto wszystkie szczepienia ${localStorage.getItem('animalName')}`: `${localStorage.getItem('user')} nie masz zanotowanych żadnych szczepień, czy chcesz je dodać ?`}`)
         
    },[])

    useEffect(() => {
        localStorage.setItem('szczepienia', JSON.stringify(szczepienieArr));
         if (!szczepienieArr.length) {
           
        setFlag(false);
        setNavText(`${localStorage.getItem('user')} nie masz zanotowanych żadnych szczepień, czy chcesz je dodać ?`);
    } else {
        setFlag(true);
        setNavText(`Oto wszystkie szczepienia ${localStorage.getItem('animalName')}`);
    }
    
    }, [szczepienieArr]);

     const handleDeleteVisit = (index , date, key) => {     
         const newArr = szczepienieArr.filter((_, i) => i !== index);
         setSzczepienieArr(newArr);
          const newArrEvents = props.events.filter((event)=>{
           return event.key !== key
         })
         props.setEvents(newArrEvents)
     }
    
   
    return(
        <div className= {styles.mainDiv}>
            
        <Navbar ref = {nav}  title = {navText}></Navbar>

        <div  ref = {laterContent} >
            {flag ? <div className= {styles.btnAndListWrapper}>
                
                    <button className={styles.addVisitBtn} onClick = {changeToForm}> <Plus />Dodaj szczepienie</button>
                
                <VisitList setSum = {props.setSum} sum = {props.sum} typeOfVisit = 'szczepień' line1 = {'Rodzaj szczepienia'} line2 = {'Data'} line3 = {'Cena'} line4 = {'Notatka'} handleDeleteVisit = {handleDeleteVisit}  setSzczepieniaArr = {setSzczepienieArr} visits = {szczepienieArr}></VisitList> 
                </div> : 
                    <WeterynarzForm szczepienieArr = {szczepienieArr}  szczepieniaDate = {szczepieniaDate ? szczepieniaDate : null } handlePushEvent = {props.handlePushEvent} typeOfMoney = {'Szczepienie'} sum = {props.sum} handlePushToSum = {props.handlePushToSum} inputType = {'date'} submitBtnText = {'Zapisz szczepienie'} note = {'notatka'} price = {'Cena wizyty'} reason = {'Data szczepienia '} place = {'Rodzaj szczepienia'} handleSaveVisit = {handleSaveVisit} setNavText= {setNavText}  setFlag = {setFlag}></WeterynarzForm>
                
                }
       
        </div>
                
        </div>
    )
}
export default Szczepienia