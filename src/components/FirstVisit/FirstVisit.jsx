import { useState, useEffect,useRef } from "react"
import styles from './FirstVisit.module.css'
import { ToastContainer, toast ,Bounce} from 'react-toastify';







function FirstVisit (props){

 
 const user = useRef(null)
 const spices = useRef(null)
 const animalName = useRef(null)
 const popUp = useRef(null)
    const changeThemeToDark = (e)=>{
        e.preventDefault()
        props.setTheme('dark')
        localStorage.setItem('theme', 'dark')
    }
     const changeThemeToLight = (e)=>{
        e.preventDefault()
         props.setTheme('light') 
        localStorage.setItem('theme', 'light')
    }
const  saveChoicesAndClosePopUp = (e)=>{
        e.preventDefault()
        
        if(user.current.value && spices.current.value&&animalName.current.value){
            props.setUserName( user.current.value)
            props.setGatunek(spices.current.value)
            props.setAnimalName(animalName.current.value)
            props.setFirstVisit('notFirst')
            
            
            
            localStorage.setItem('user',user.current.value  )
            localStorage.setItem('animal',spices.current.value )
            localStorage.setItem('animalName',animalName.current.value)
            localStorage.setItem('firstVisit', 'notFirst')
            // window.location.reload()
            
            // toast.info('Zapisywanie...', {
            //             position: "top-right",
            //             autoClose: 3000,
            //             hideProgressBar: false,
            //             closeOnClick: false,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //             theme: "dark",
            //             transition: Bounce,
            //             });
                        
                        
                           
                       
            // popUp.current.style.display = 'none'
            // window.location.reload()
            
        }
        

    }





       

   
    
    return(
        

        <>
            <div ref = {popUp} className={styles.firstVisitPopUp}>
                <h2 className= {styles.mainTitle}>Hej, <br></br> widzę, że pierwszy raz korzystasz z mojej aplikacij dlatego musisz odpowiedzieć na kilka pytań... </h2>
            <form  className={styles.firstVisitForm}>
                
                <input className= {styles.inputField} type="text" ref = {user} placeholder="Twoje imię" />
                <input className= {styles.inputField} type="text" ref = {spices} placeholder="Gatunek twojego pupila" />
                <input className= {styles.inputField} type="text" ref = {animalName} placeholder="Imię twojego zwierzaka" />
                <h4 className={styles.themeTitle}>Jaki tryb aplikacij preferujesz ?</h4>
                
                
            </form>
            <div className={styles.wrapTheme}>
                    
                    <button onClick={(e)=>{changeThemeToLight(e)}} className={styles.lightBtn}>Light</button>
                    <button onClick={(e)=>{changeThemeToDark(e)}} className={styles.darkBtn}>Dark</button>
                </div>
                <button className={styles.submitBtn} type="submit" onClick={(e)=>{saveChoicesAndClosePopUp(e)}}>Zapisz!</button>
            
        
            </div>  
            
        </>
    )
}
export default FirstVisit
