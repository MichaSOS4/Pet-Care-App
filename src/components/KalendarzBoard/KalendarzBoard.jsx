import styles from './KalendarzBoard.module.css'
import { useState, useRef, forwardRef, useEffect } from 'react'
import CallenderEvent from '../CallenderEvent/CallenderEvent'
import { NotebookPen, Plus, Weight,Syringe,BriefcaseMedical } from 'lucide-react'

const KalendarzBoard = forwardRef( (props,ref)=>{
    const [hasEvent,SetHasEvent] = useState('')
    const [eventsNumber,setEventsNumber] = useState('')
    const [day,setDay] = useState('')
    const [choosenDate,setChoosenDate] = useState('')
    const [eventActive, setEventActive] = useState(true)
    const days = ['Pn','Wt','Śr','Czw','Pt','Sob','Niedz']
    const months = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
    const currentDate = new Date()
    const [year,setYear] = useState(currentDate.getFullYear())
    const [month,setMonth] = useState(currentDate.getMonth() )
    const daysOfTheMonth=  new Date(year, month + 1,0).getDate()
    let firstDayOfMonth = new Date(year ,month ,1).getDay()
    firstDayOfMonth === 0 ? firstDayOfMonth = 6 : firstDayOfMonth 
    const [eventsToPush,setEventsToPush] = useState([])
    



    const prevMonth = ()=>{
        setMonth((prevMonth)=> prevMonth == 0 ? 11 : prevMonth - 1)
        setYear((prevYear)=> month == 0 ? prevYear - 1 : prevYear)
    }
    const nextMonth = ()=>{
        setMonth((prevMonth)=> prevMonth == 11 ? 0 : prevMonth+ 1)
        setYear((prevYear)=> month == 11 ? prevYear + 1 : prevYear)
    }
    const addEvent = (existingEvents,day,hasEvent)=>{
        SetHasEvent(hasEvent)
        setDay(day)
        setEventsNumber(existingEvents)
        !hasEvent? setEventActive(false) : null
        setEventsToPush(existingEvents)
        setChoosenDate({year : year,
                        month: month + 1,
                        day: day+ 1
        })
        
    }
    const changeFlagWithExistingEvent = (existingEvents,day,hasEvent)=>{
        // SetHasEvent(hasEvent)
        // setDay(day)
        // setEventsNumber(existingEvents)
        setEventActive(false)
        setEventsToPush(existingEvents)
        setChoosenDate({year : year,
                        month: month + 1,
                        day: day+ 1
        })
        console.log(year, month, day+1)
    }
    const createDay = (day)=>{
    console.log(new Date(year, month, day+ 1))
    }

   
    

    

    return(
        <div ref = {ref}  className={styles.wrapper}> 
            
                {eventActive ? < div className = {styles.callenderWrap} >
                    
                    <div className = {styles.monthAndYear}>
                        <button onClick = {prevMonth} className = {styles.prev}> - </button>
                        <span className = {styles.year}>{year}</span>
                        <span className = {styles.month}>{months[month]}</span>
                        <button onClick={nextMonth}  className = {styles.next}> + </button>
                    </div>
                    <div className = {styles.days}>
                        {days.map((day,idx)=><span className = {styles.day} key = {idx}> {day}</span>
                        )}
                    </div>
                    <div className = {styles.board}>
                        {[...Array(firstDayOfMonth - 1).keys()].map((_,idx)=>{
                            return <span  className = {styles.emptyBoardDay} key = {idx}></span>
                        })}
                        {[...Array(daysOfTheMonth).keys()].map((day, idx)=>{
                            
                            const date = new Date(year,month,day+1)
                            const eventsNumber = props.events.filter((event)=>{
                                let eventDate = new Date(event.date)
                              return  date.toDateString() == eventDate.toDateString()
                            })
                            const hasEvent = props.events.some((event)=>{
                                let eventDate = new Date(event.date)
                                return eventDate.toDateString() == date.toDateString()
                            })

                            
                            return <button  onClick={()=>{addEvent(eventsNumber,day,hasEvent)}}    className = { `${hasEvent ? 'hasEvent' : ''} ${date.toDateString() == currentDate.toDateString() ? 'today' : styles.boardDay} `}  key = {idx} >{day + 1} {hasEvent? <span className= {styles.eventsNumber}>{eventsNumber.length}</span> : null} </button>
                        })}
                       {eventsToPush.length ?  <div className={styles.eventList}>
                            <button className={styles.addEventFromList} onClick={()=>{changeFlagWithExistingEvent(eventsNumber,day,hasEvent)} }><Plus />Dodaj zdarzenie</button>
                             <ul className={styles.events}>
                                        {eventsToPush.map((event,idx)=>{ 
                                            let typeOfIcon = ''
                                            switch(event.type){
                                                case 'Ważenie pupila': typeOfIcon = <Weight/>;
                                                break;
                                                case 'Szczepienie': typeOfIcon = <Syringe/>;
                                                break;
                                                case 'Notatka': typeOfIcon = <NotebookPen/>;
                                                break;
                                                case 'Wizyta weterynaryjna' : typeOfIcon = <BriefcaseMedical/>
                                                break;
                                            
                                            }
                                            return <li className={styles.event} key = {idx}>Data : {event.date} <br />
                                                                         {typeOfIcon}     Rodzaj zdarzenia : {event.type}</li> })}
                                    </ul>
                        </div> : null}
                        
                    </div>

                </div> : <CallenderEvent choosenDate = {choosenDate} handlePushEvent = {props.handlePushEvent}  notes = {props.notes} setNotes = {props.setNotes}  handlePushNote = {props.handlePushNote} setEventActive = {setEventActive} eventActive = {eventActive} eventsToPush = {eventsToPush} ></CallenderEvent> 
                    
                 }
                
            
        </div>
    )
})

export default KalendarzBoard