import styles from './Lekarstwa.module.css'
import{useRef,useState,useEffect, useLayoutEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Form } from 'react-router-dom'
import { Plus, Undo2,Save } from 'lucide-react'
function Lekarstwa(props){
    const nav = useRef(null)
    const [flag,setFlag] = useState(true)
    const [navText,setNavText] = useState(!props.meds.length ? `${localStorage.getItem('animalName')} nie przyjmuje narazie żadnych leków`: `Oto wszystkie lekarstwa jakie przyjmuje ${localStorage.getItem('animalName')}`)
    
    const laterContent = useRef(null)
    const nameInput = useRef(null)
    const reasonInput = useRef(null)
    const zaleceniaInput = useRef(null)
    const priceInput = useRef(null)
    const startDateInput = useRef(null)
    const endDateInput = useRef(null)
    const [selectedMed,setSelectedMed] = useState(null)

    useEffect(()=>{
        if(nav){
        const navHeight = nav.current.offsetHeight
        laterContent.current.style.marginTop = navHeight  + 'px'
        
        }
    },[])
    useEffect(()=>{
        if(nav){
        const navHeight = nav.current.offsetHeight
        laterContent.current.style.marginTop = navHeight  + 'px'
        
        }
    },[navText])

    const changeToForm = ()=>{
        setFlag(prevFlag => prevFlag = false)
        setNavText(`Dodawanie nowego leku`)
    }
    const seeMoreInfo = (idx)=>{
        const med  = props.meds[idx]
            
        
        
        setSelectedMed(prevMed => prevMed = med)
    }
    const saveMed = (e)=>{
        e.preventDefault()
        if(nameInput.current.value && reasonInput.current.value&& zaleceniaInput.current.value && startDateInput.current.value && priceInput.current.value ){
            const medicine = {
                name:nameInput.current.value,
                reason: reasonInput.current.value,
                zalecenia:zaleceniaInput.current.value,
                price: priceInput.current.value,
                start: startDateInput.current.value,
                end: endDateInput.current.value
            }
            props.handlePushMedicine(medicine)
                 nameInput.current.value= ''
                 reasonInput.current.value = ''
                 zaleceniaInput.current.value = ''
                 priceInput.current.value =''
                 startDateInput.current.value = ''
                 endDateInput.current.value = ''
                 setFlag(prevFlag => prevFlag = true)
        }
    }
    const resetSelectedMedandBackToList = ()=>{
        setSelectedMed(prevMed => prevMed = null)
    }
    const back = (e)=>{
        e.preventDefault()
        setFlag(prevFlag=>prevFlag = true)
        
    }



    return (
        <div  className = {styles.lekarstwaWrapper}>
                <Navbar ref = {nav} title = {navText}></Navbar>
            <div ref = {laterContent}>
                {props.meds.length && flag ? <div>

                    {selectedMed ? <div className={styles.moreInfoMed }>
                        <button className = {styles.back} onClick={resetSelectedMedandBackToList}><Undo2/>wstecz</button>
                    <p><b>Nazwa:</b>{selectedMed.name} </p>
                    <p><b>Powód:</b>{selectedMed.reason} </p>
                    <p><b>Zalecenia/Dawkowanie:</b>{selectedMed.zalecenia} </p>
                    <p><b>Cena leku:</b>{selectedMed.price} </p>
                    <p><b>Rozpoczęcie dawkowania:</b>{selectedMed.start} </p>
                    {selectedMed.end.length ? <p><b>Zakończenie dawkowania</b> {selectedMed.end}</p> : <p><b>Zakończenie dawkowania</b> {'Brak daty'}</p>}
                    </div>: null }
                    
                    <div className={selectedMed ? styles.listHide : styles.listShow}>
                    <button onClick={changeToForm} className = {styles.addNewMed}><Plus />Dodaj nowy lek</button>
                    <ul className = {styles.meds}>
                    {props.meds.map((med,idx)=>{
                        return <li key = {idx} className = {styles.med}><b>Nazwa:</b>{med.name}<br></br>
                                                             <b>Rozpoczęcie dawkowania:</b>{med.start}  <br></br>
                                                             
                                                             
                                                                {/* <button onClick = {()=>{seeMoreInfo(med.name,med.reason,med.zalecenia,med.price,med.start,med.end)}} className={styles.moreInfo}>Więcej informacij..</button> */}
                                                                <button onClick = {()=>{seeMoreInfo(idx)}} className={styles.moreInfo}>Więcej informacij..</button>
                                                             
                                                             
                                                             
                                                             
                                                             
                                                             
                                                              </li>
                    })}
                </ul>
                </div> 
                </div>: <form className={styles.form}>
                    {props.meds.length ?<button className={styles.backTo} onClick={(e)=>{back(e)}}><Undo2/>wstecz</button> : null }
                    
                    <input className={styles.firstInput} ref ={nameInput} type="text" placeholder='nazwa leku'/>
                    <input ref = {reasonInput} type="text" placeholder='przyczyna stosowania' />
                    <textarea ref = {zaleceniaInput} name="" id="" placeholder=' zalecenia stosowania '></textarea>
                    <input ref = { startDateInput} type="date" name="" id="" placeholder='rozpoczęcie dawkowania'/>
                    <input ref = {endDateInput} type="date" name="" id="" placeholder='zakończenie dawkowania'/>
                    <input ref = {priceInput} type='number' placeholder='cena' />
                    <button onClick = {(e)=>{saveMed(e)}} className = {styles.saveMed}><Save />Zapisz lek </button>
                    </form>}
                </div>

        </div>
    )
}
export default Lekarstwa