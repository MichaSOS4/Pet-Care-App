import Navbar from "../../components/Navbar/Navbar"
import styles from './Waga.module.css'
import { useState, useEffect,useRef } from "react"
import WeightForm from "../../components/WeightForm/WeightForm"
import WeightList from "../../components/WeightsList/WeightList"
import WeightStat from "../../components/WeightStat/WeightStat"
import { useLocation } from "react-router-dom"
import { Plus,FileChartLine } from "lucide-react"
function Waga(props){
    const location = useLocation()
   const [wagaDate,setWagaDate] = useState(location.state? location.state.date : '')
    const [flag,setFlag] = useState(true)
    const [navText,setNavText] = useState(` ${localStorage.getItem('user')} nie masz zanotowanych żadnych wag, czy chcesz je dodać ?`)
    const [weights, setWeights] = useState(JSON.parse(localStorage.getItem('weights')) || []);
    const nav = useRef(null)
    const laterContent = useRef(null)
    const statInfo = useRef(null)
    const list = useRef(null)

    const showStats = ()=>{
        statInfo.current.style.left = 5 + '%'
        list.current.style.transform = 'scale(0)'
        
        
    }
    useEffect(()=>{
        if(nav.current&& laterContent.current){
           
                const navHeight = nav.current.offsetHeight;
            laterContent.current.style.marginTop = `${navHeight + 30}px`;
            if(statInfo.current){
                statInfo.current.style.top = navHeight + 30 + 'px'
            }
            
            
            
        }
    },[navText])
    useEffect(() => {
        localStorage.setItem('weights', JSON.stringify(weights));
        if (!weights.length) {
            setFlag(false)
            setNavText(`${localStorage.getItem('user')} nie masz zanotowanych żadnych wag, czy chcesz je dodać ?`);
        } else {
            setNavText(`Oto wszystkie wagi ${localStorage.getItem('animalName')}`);
            setFlag(true)
        }
    },[weights])

    const handleSaveWeight = (weight) =>{
        setWeights([weight,...weights])


    }
    const changeToForm=()=>{
        setFlag(false)
        setNavText('Dodawanie nowej wagi ')
    }


    return(
        <div className={styles.mainDiv}>
        <Navbar title = {navText} ref={ nav} ></Navbar>
        
        <div ref = {laterContent}>

        {flag? <div className={styles.wrap }>
            <div className={styles.buttonWrapper}>
                <button className={styles.addWeightBtn} onClick={changeToForm}><Plus />Dodaj wagę </button>
                <button className={styles.addWeightBtn} onClick={showStats}><FileChartLine />Sprawdź statystyki</button>
            </div>
                <WeightList ref = {list}  weights = {weights}></WeightList>
                <WeightStat listRef = {list} ref = {statInfo} weights = {weights}></WeightStat>
        </div>:<WeightForm setFlag = {setFlag} flag = {flag} wagaDate = {wagaDate} handlePushEvent = {props.handlePushEvent} handleSaveWeight = {handleSaveWeight} setWeights = {setWeights} weights = {weights}> </WeightForm> }

        
        </div>
        
        
        
        </div>
    )
}
export default Waga