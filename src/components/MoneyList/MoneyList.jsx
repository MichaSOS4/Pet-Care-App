import styles from './MoneyList.module.css'
import { useEffect, useState } from 'react'
import {CircleDollarSign} from 'lucide-react'
function Moneylist (props){
   

return(
    <>
    <h3 className={styles.moneyListTitle}>Łączna kwota przeznaczona na {localStorage.getItem('animalName')} to: {parseFloat(props.money).toFixed(2)}zł  </h3>
<ul className={styles.list}>
    {props.sum.map((sum,idx)=>{
        return( 
            
            
            <li className={styles.listItem} key = {idx}>
                {idx == 0 ? <span>OSTATNI WYDATEK <CircleDollarSign /></span> : null}
                <p>Typ :    {sum.type}</p>
                <p>Kwota : { parseFloat(sum.money).toFixed(2)} zł</p>
            </li>
            
        )
    })}
</ul>
</>

)
}
export default Moneylist