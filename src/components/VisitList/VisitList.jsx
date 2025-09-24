
import styles from './VisitList.module.css'
import { BadgeX } from 'lucide-react'
function VisitList (props){
    
    return (
        <div className={styles.visitListWrapper}>
            <h2 className = {styles.listTitle }>Lista odbytych {props.typeOfVisit}</h2>
            <ul className={styles.list}>
                {props.visits.map((visit,idx)=>{
                    return(
                        <li key = {idx} className={styles.listItem}>
                            <button  onClick={ ()=>{props.handleDeleteVisit(idx, visit.reason,visit.key)}} className= {styles.deleteBtn}> <BadgeX />Usuń</button>
                           <strong>{props.line1}:</strong> {visit.place} <br />
                           <strong>{props.line2}:</strong> {visit.reason} <br />
                          <strong>{props.line3}:</strong> {visit.price} <br />
                           <strong>{props.line4}:</strong> {visit.note} <br /> 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default VisitList