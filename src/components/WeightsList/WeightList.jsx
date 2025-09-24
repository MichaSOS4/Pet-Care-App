import { forwardRef } from 'react';
import styles from './WeightList.module.css'
const WeightList = forwardRef(
    (props,ref)=>{
    return(
        <div className={styles.listWrap} ref = {ref}>
        
            <ul className={styles.list}>
                {props.weights.map((weight,idx)=>{
                    return(
                        <li  className={idx == props.weights.length - 1 ? styles.lastItem : styles.listItem} key={idx}>Data : {weight.time} <br></br>
                        Waga : {weight.kg}kg   </li>
                    )
                })}
                   
            </ul>
        </div>
    )
}
) 
export default WeightList;