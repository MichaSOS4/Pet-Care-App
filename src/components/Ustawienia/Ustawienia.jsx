import styles from './Ustawienia.module.css'
import Navbar from '../Navbar/Navbar'
import { useRef,useState,useEffect } from 'react'
import { UserCog,Dog,SunMoon,Moon,Sun,FolderX } from 'lucide-react'
function Ustawienia(props){
const [navText,setNavText] = useState('Ustawienia aplikacij')
const nav = useRef(null)
const user = useRef(null)
const spiece = useRef(null)
const animal = useRef(null)

const laterContent = useRef(null)
const [somethingChanged,setSomethingChanged] = useState(false)
const [div,setDiv] = useState(null)
const handleClick = (id)=>{
setDiv(id)
console.log(id)
}
const showRest = (e)=>{
const id =  e.target.parentElement.getAttribute('id')
handleClick(id)
}
useEffect(()=>{
    const navHeight = nav.current.offsetHeight
    laterContent.current.style.marginTop = navHeight + 'px'
},[navText])

const changeUserName = ()=>{
    if(user.current.value.length){
        props.setUserName(user.current.value)
    localStorage.setItem('user', user.current.value)
    user.current.value = ''
    // setSomethingChanged(true)
    setDiv('0')
    }
    
    
    
}
const changeAnimalName = ()=>{
    if(animal.current.value.length){
    props.setAnimalName(animal.current.value)
    localStorage.setItem('animalName', animal.current.value)
    animal.current.value = ''
    // setSomethingChanged(true)
    setDiv('0')
    }
    
} 
const changeSpiece = ()=>{
    if(spiece.current.value.length){
    props.setUserName(spiece.current.value)
    localStorage.setItem('animal', spiece.current.value)
    spiece.current.value = ''
    // setSomethingChanged(true)
    setDiv('0')
    }
   
}
    const changeThemeToDark = ()=>{
        
        props.setTheme('dark')
        localStorage.setItem('theme', 'dark')
    }
     const changeThemeToLight = ()=>{
       
         props.setTheme('light') 
        localStorage.setItem('theme', 'light')
    }
    const hardReset = ()=>{
        localStorage.clear()
        window.location.reload()
    }


    return(
        <>
        <Navbar somethingChanged = {somethingChanged} settigsOn = {props.settigsOn} setSettigsOn = {props.setSettigsOn} ref = {nav} title = {navText}></Navbar>
        <div ref={laterContent} className={styles.settigWrap}>
            <h4 className={styles.settigsTitle}>Ustawienia</h4>
            <div id='1' className = {`${styles.mainDiv} ${div == '1'? styles.active : ''}`}>
                <button onClick = {(e)=>showRest(e)} className = {`${styles.settigBtn} ${styles.mainSettigBtn}`}><UserCog />Nazwa użytkownika</button>
                <div className={styles.hideDiv}>
                    <input ref = {user} className = {styles.settigInput} type="text"  placeholder='Nowa nazwa użytkownika'/>
                    <button onClick={changeUserName} className = {styles.settigBtn}>Zapisz</button>
                </div>
            </div>
            <div id='2'  className = {`${styles.mainDiv} ${div == '2'? styles.active : ''}`}>
                <button onClick = {(e)=>showRest(e)} className  = {`${styles.settigBtn} ${styles.mainSettigBtn}`}><Dog />Imię zwierzaka</button>
                <div className={styles.hideDiv}>
                        <input ref = {animal} className = {styles.settigInput} type="text"  placeholder='Nowe imię zwierzaka'/>
                        <button onClick={changeAnimalName} className = {styles.settigBtn}>Zapisz</button>
                 </div>
            </div>
            <div id='3'  className = {`${styles.mainDiv} ${div == '3'? styles.active : ''}`}>
                <button onClick = {(e)=>showRest(e)} className = {`${styles.settigBtn} ${styles.mainSettigBtn}`}>Gatunek zwierzaka</button>
                <div className={styles.hideDiv}>
                    <input ref = {spiece} className = {styles.settigInput} type="text"  placeholder='Nowy gatunek zwierzaka'/>
                    <button onClick={changeSpiece} className = {styles.settigBtn}>Zapisz</button>
                </div>
            </div>
            <div id='4'  className = {`${styles.mainDiv} ${div == '4'? styles.active : ''}`}>
                <button onClick = {(e)=>showRest(e)} className = {`${styles.settigBtn} ${styles.mainSettigBtn}`}><SunMoon />Zmień tryb kolorów</button>
                <div className={styles.hideDiv}>
                    <button onClick={changeThemeToLight} className = {styles.settigBtn}><Sun />Light</button>
                    <button onClick={changeThemeToDark} className = {styles.settigBtn}><Moon />Dark</button>
                </div>
            </div>
            <div id='5'  className = {`${styles.mainDiv} ${div == '5'? styles.active : ''}`}>
                <button onClick = {(e)=>showRest(e)} className = {`${styles.settigBtn} ${styles.mainSettigBtn}`}><FolderX />Usuń pamięć aplikacij</button>
                <div className={styles.hideDiv}>
                    <p>Czy jesteś pewien ? Utracisz całą historię swojego zwierzaka..</p>
                    <button onClick={hardReset} className = {styles.settigBtn}>Tak jestem pewien ! </button>
                </div>
            </div>
            
            
            
            
            
            
        </div>
        </>
    )
}
export default Ustawienia