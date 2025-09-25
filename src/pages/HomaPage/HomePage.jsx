import { useState, useEffect,useRef, } from 'react'
import FirstVisit from '../../components/FirstVisit/FirstVisit'
import Menu from '../../components/Menu/Menu'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Homepage.module.css'
import Ustawienia from '../../components/Ustawienia/Ustawienia'
import 'react-toastify/dist/ReactToastify.css';


function HomePage(props){
    
    const [settigsOn, setSettigsOn] = useState('off')
    const [isFirstVisit,setFirstVisit] = useState(localStorage.getItem('firstVisit')|| 'first')
    const nav = useRef(null)
    const laterContent = useRef(null)
    const[navText,setNavText] = useState(()=>{
        if(props.userName && props.animalName){
            return `Witaj ${props.userName}! Jak się miewa    ${props.animalName} ?`
        }
    })
    useEffect(()=>{
        if(props.userName && props.animalName){
        setNavText( `Witaj ${props.userName}! Jak się miewa    ${props.animalName} ?`)
        }
    },[props.userName,props.animalName])



useEffect(()=>{
        if(nav.current&& laterContent.current){
            
                const navHeight = nav.current.offsetHeight;
            laterContent.current.style.marginTop = `${navHeight}px`;
            
            
        }
    },[settigsOn])
    useEffect(()=>{
        if(nav.current&& laterContent.current){
            
                const navHeight = nav.current.offsetHeight;
            laterContent.current.style.marginTop = `${navHeight}px`;
            
            
        }
    },[navText,props.userName])

     useEffect(()=>{
       localStorage.setItem('firstVisit', isFirstVisit)
    },[isFirstVisit])

    return(
        <>
            
            {isFirstVisit == 'first' ? <FirstVisit  setGatunek = {props.setGatunek} setAnimalName = {props.setAnimalName} setUserName = {props.setUserName} gatunek = {props.gatunek} userName ={props.userName} animalName = {props.animalName}  theme = {props.theme} setTheme = {props.setTheme} isFirstVisit = {isFirstVisit} setFirstVisit = {setFirstVisit} /> :
            <div className={styles.homePageWrapper}>
                {settigsOn == 'off'? <div className={styles.navB}>
                    <Navbar  setGatunek = {props.setGatunek} setAnimalName = {props.setAnimalName} setUserName = {props.setUserName} gatunek = {props.gatunek} userName ={props.userName} animalName = {props.animalName} settigsOn = {settigsOn} setSettigsOn = {setSettigsOn}  ref = {nav} title = {navText}></Navbar>
                    <div className='.menulater'>
                    <Menu className = {styles.later} ref = {laterContent}/>
                    </div>
                    </div> : 
                        
                         <Ustawienia  setGatunek = {props.setGatunek} setAnimalName = {props.setAnimalName} setUserName = {props.setUserName} gatunek = {props.gatunek} userName ={props.userName} animalName = {props.animalName} theme = {props.theme} setTheme = {props.setTheme} settigsOn = {settigsOn} setSettigsOn = {setSettigsOn}></Ustawienia> 
                         }
                
                </div>
             }
             

        
        </>
    )
}
export default HomePage