import { useState, useEffect,useRef, } from 'react'
import FirstVisit from '../../components/FirstVisit/FirstVisit'
import Menu from '../../components/Menu/Menu'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Homepage.module.css'
import Ustawienia from '../../components/Ustawienia/Ustawienia'
import 'react-toastify/dist/ReactToastify.css';


function HomePage(props){
    const [userName,setUserName] = useState('')
 const [animal,setAnimal] = useState('')
 const [userAnimalName,setUserAnimalName] = useState('')
    const [settigsOn, setSettigsOn] = useState('off')
    const [isFirstVisit,setFirstVisit] = useState(localStorage.getItem('firstVisit')|| 'first')
    const nav = useRef(null)
    const laterContent = useRef(null)
    const[navText,setNavText] = useState(()=>{
        if(localStorage.getItem('user') && localStorage.getItem('animalName')){
            return `Witaj ${localStorage.getItem('user')}! Jak się miewa Twój   ${localStorage.getItem('animalName')} ?`
        }
    })



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
    },[navText])

     useEffect(()=>{
       localStorage.setItem('firstVisit', isFirstVisit)
    },[isFirstVisit])

    return(
        <>
            
            {isFirstVisit == 'first' ? <FirstVisit setUserAnimalName = {setUserAnimalName} setAnimal = {setAnimal} setUserName = {setUserName} theme = {props.theme} setTheme = {props.setTheme} isFirstVisit = {isFirstVisit} setFirstVisit = {setFirstVisit} /> :
            <div className={styles.homePageWrapper}>
                {settigsOn == 'off'? <div className={styles.navB}>
                    <Navbar settigsOn = {settigsOn} setSettigsOn = {setSettigsOn}  ref = {nav} title = {navText}></Navbar>
                    <div className='.menulater'>
                    <Menu className = {styles.later} ref = {laterContent}/>
                    </div>
                    </div> : 
                        
                         <Ustawienia setUserAnimalName = {setUserAnimalName} setAnimal = {setAnimal} setUserName = {setUserName} theme = {props.theme} setTheme = {props.setTheme} settigsOn = {settigsOn} setSettigsOn = {setSettigsOn}></Ustawienia> 
                         }
                
                </div>
             }
             

        
        </>
    )
}
export default HomePage