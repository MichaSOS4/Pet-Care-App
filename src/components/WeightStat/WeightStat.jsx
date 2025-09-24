import styles from './WeightStat.module.css'
import { useState, useEffect, forwardRef, useRef } from 'react'
import { Undo2 } from 'lucide-react'
const WeightStat = forwardRef(
    (props, ref) =>{
    const [stats,setStats] = useState('')
        
    const hideStats = ()=>{
        ref.current.style.left = 100 + '%'
        props.listRef.current.style.transform = 'scale(1)'
    }

    useEffect(()=>{
if(props.weights.length >=2){
    if(props.weights[0].kg === props.weights[1].kg){
        setStats(`Waga ${localStorage.getItem('animalName')} nie zmieniła się od ostataniego ważenia.`)
    }else if(Number(props.weights[0].kg) > Number(props.weights[1].kg)){
        setStats(`${localStorage.getItem('animalName')} przybrał na wadze o ${Number(props.weights[0].kg) - Number(props.weights[1].kg) } kg`)
    }else{
         setStats(`${localStorage.getItem('animalName')} schudł na wadze o  ${Number(props.weights[1].kg) - Number(props.weights[0].kg) } kg`)
    
    }
}
     

    },[props.weights])



   
    return(
        <div  ref = {ref} className={styles.statsWrap}>
            <button onClick={hideStats} className={styles.showBtn}><Undo2 />Cofnij </button>
          {props.weights.length <= 1 ? <h2 className={styles.title}>Dodaj więcej ważeń aby wyświetlać statystyki</h2> :
                <div>
                <h2 className={styles.title}>Statystyki ostatnich wag :</h2>
                <p className={styles.stat}>Ostatnie ważenie :<br></br> Data {props.weights[0].time},  Waga {props.weights[0].kg}kg</p>
                <p className={styles.stat}>Przedostatnie ważenie :<br></br> Data {props.weights[1].time},  Waga {props.weights[1].kg}kg</p>
                <p className={styles.stat}>Podsumowanie :<br></br> {stats} </p>
                </div> }
               

      </div>  
    )
}
) 
export default WeightStat