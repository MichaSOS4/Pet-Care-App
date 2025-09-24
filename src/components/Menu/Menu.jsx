import { HashRouter, Routes, Route, Link } from "react-router-dom"
import styles from './Menu.module.css'
import { forwardRef } from "react"
import { CalendarDays,BriefcaseMedical,HandCoins,Pill,Syringe,NotebookPen,Weight } from "lucide-react"
const  Menu = forwardRef((props,ref)=>
    
    (
       <>
       <div ref = {ref} className={styles.linkWrapper}>
            <div className={styles.linkTo} ><Link to= '/szczepienia'><button className = {`${styles.linkBtn} ${styles.firstLink}`} ><Syringe />Szczepienia</button></Link></div>
            <div className={styles.linkTo}><Link to= '/weterynarz'><button className = {styles.linkBtn}><BriefcaseMedical />Weterynarz</button></Link></div>
            <div className={styles.linkTo}><Link to= '/wydatki'><button className = {styles.linkBtn}><HandCoins />Wydatki</button></Link></div>
            <div className={styles.linkTo}><Link to= '/lekarstwa'><button className = {styles.linkBtn}><Pill />Lekarstwa</button></Link></div>
            <div className={styles.linkTo}><Link to= '/notatki'><button className = {styles.linkBtn}><NotebookPen />Notatki</button></Link></div>
            <div className={styles.linkTo}><Link to= '/waga'><button className = {styles.linkBtn}><Weight />Waga</button></Link></div>
            <div className={styles.linkTo}><Link to= '/kalendarz'><button className = {styles.linkBtn}><CalendarDays /> Kalendarz</button></Link></div>
            
            </div>
       </>
       
    )
    )

export default Menu