import { forwardRef, useEffect, useState } from "react"

import styles from './Navbar.module.css'
import Logo from "../Logo/Logo"
import { HashRouter, Routes, Route, Link, useLocation,useOutletContext } from "react-router-dom"
import { House,CalendarDays,Settings } from "lucide-react"
import InstallBtn from "../InstallBtn/InstallBtn"


const Navbar = forwardRef((props, ref) => {


    
    
    const changeSettigs = ()=>{
        if(props.settigsOn == 'off'){
            props.setSettigsOn('on')
        }else{
            return
        }
        
    }
    const changeSettigs2 = ()=>{
       if(props.settigsOn == 'on'){
            props.setSettigsOn('off')
        }else{
            return
        }
        if(props.somethingChanged){
            window.location.reload()
        }
    }
        
    
    return(
    <>
        
        <nav className={styles.bar} ref={ref}>
            <div className={styles.wrapper}>
                
            {useLocation().pathname == '/' ? <button onClick = {changeSettigs} className={styles.settigBtn}><Settings /></button> : null }
            
           <div className="logoWrap"><Logo /></div> 
           <div className = {styles.mainBtns}>
            <Link to='/'><button onClick={changeSettigs2}  className={styles.backToHome}><House /></button></Link>
            <Link to='/kalendarz'><button   className={styles.backToCallender}><CalendarDays /></button></Link>
           </div>
            
            <h4 className={styles.helloTitle}>{props.title}</h4>
            </div>
        </nav>
        
    </>
)});
export default Navbar;