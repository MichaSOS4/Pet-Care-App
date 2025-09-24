import Navbar from "../../components/Navbar/Navbar"
import styles from './Wydatki.module.css'
import { useState, useEffect, useRef } from "react"
import Moneylist from "../../components/MoneyList/MoneyList"
function Wydatki (props){

    
    const [navText,setNavText] = useState(` ${props.sum ? `Oto suma pieniędzy przeznaczona na opiekę weterynaryjną  ${localStorage.getItem('animalName')}`: `${localStorage.getItem('user')} nie masz zanotowanych żadnych wydatków, dodaj wizyty lub szczepienia a wtedy te sumy się tutaj pojawią. `}`)
    const nav = useRef(null)
    const laterContent = useRef(null)
    useEffect(()=>{
        if(nav.current&& laterContent.current){
            
                const navHeight = nav.current.offsetHeight;
            laterContent.current.style.marginTop = `${navHeight + 30}px`;
            
            
        }
    },[navText])


    useEffect(()=>{
        if(props.sum.length){
            setNavText(`Oto suma pieniędzy przeznaczona na opiekę weterynaryjną  ${localStorage.getItem('animalName')}`)
        }else{
            setNavText(`${localStorage.getItem('user')} nie masz zanotowanych żadnych wydatków, dodaj wizyty lub szczepienia a wtedy te sumy się tutaj pojawią. `)
        }
        
    },[props.sum])


   


    return (
        <div className={styles.mainDiv}>
            <Navbar ref = {nav}   title = {navText}></Navbar>
        

             <div ref = {laterContent}>
            
                {props.sum.length ? 
                <Moneylist money = {props.money} sum = {props.sum}></Moneylist>
                : <h4 className={styles.noSpendedMoney}>Nie masz żadnych wydatków</h4>}

              </div>
        </div>
    )
}
export default Wydatki