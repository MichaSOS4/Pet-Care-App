import { useState, useEffect } from 'react'
import { createHashRouter, RouterProvider } from "react-router-dom"
import Notatki from './pages/Notatki/Notatki'
import Wydatki from './pages/Wydatki/Wydatki'
import Weterynarz from './pages/Weterynarz/Weterynarz'
import HomePage from './pages/HomaPage/HomePage'
import Szczepienia from './pages/Szczepienia/Szczepienia'
import Lekarstwa from './pages/Lekarstwa/Lekarstwa'
import Waga from './pages/Waga/Waga'
import Kalendarz from './pages/Callender/Kalendarz'
import './index.css'

function App() {
  const [theme,setTheme] = useState(localStorage.getItem('theme')|| 'light')
  const [notes,setNotes] = useState(JSON.parse(localStorage.getItem('notes'))|| [])
  const[meds,setMeds] = useState(JSON.parse(localStorage.getItem('medicine'))|| [])
const [money, setMoney] = useState((localStorage.getItem('sumMoney'))|| 0)
 const [sum,setSum] = useState(JSON.parse(localStorage.getItem('money'))||[])
const [events,setEvents] = useState(JSON.parse(localStorage.getItem('events')) || [])

const handlePushNote = (note)=>{
setNotes([note,...notes])
}
const handlePushMedicine = (med)=>{
setMeds([med,...meds])
}
useEffect(()=>{
            document.documentElement.setAttribute('data-theme',theme)
            
        },[theme])

useEffect(()=>{
      localStorage.setItem('notes', JSON.stringify(notes))
      
    },[notes])
    useEffect(()=>{
      localStorage.setItem('medicine', JSON.stringify(meds))
      
    },[meds])

const handlePushEvent = (event)=>{
        setEvents([...events,event]) 
    }
    useEffect(()=>{
      localStorage.setItem('events', JSON.stringify(events))
      
    },[events])




   useEffect(() => {
    localStorage.setItem('money', JSON.stringify(sum));
    
  }, [sum]);
   useEffect(() => {
    
    localStorage.setItem('sumMoney', money);
  }, [money]);


const handlePushToSum = (incomingSum, incomingMoney) => {
  setMoney(prevMoney => Number(prevMoney) + Number(incomingMoney));
  setSum([incomingSum, ...sum]);

};
const router = createHashRouter([
      {path: '/kalendarz',
        element : <Kalendarz handlePushEvent = {handlePushEvent} handlePushNote = {handlePushNote} setNotes = {setNotes} notes = {notes} events = {events}/>
      },
      {path: '/',
        element : <HomePage theme = {theme} setTheme = {setTheme}/>
      },
      {path: '/szczepienia',
        element : <Szczepienia setEvents = {setEvents} events = {events} handlePushEvent = {handlePushEvent} setSum = {setSum} handlePushToSum = {handlePushToSum} sum = {sum}/>
      },
      {path: '/weterynarz',
        element : <Weterynarz setEvents = {setEvents} events ={events} handlePushEvent = {handlePushEvent} setSum = {setSum} handlePushToSum = {handlePushToSum} sum = {sum}/>
      },
      {path: '/wydatki',
        element : <Wydatki money = {money} sum = {sum} handlePushToSum = {handlePushToSum} setSum = {setSum}/>
      },
      {path: '/lekarstwa',
        element : <Lekarstwa meds = {meds} handlePushMedicine = {handlePushMedicine}/>
      },
      {path: '/notatki',
        element : <Notatki handlePushNote = {handlePushNote} setNotes = {setNotes} notes = {notes}/>
      },
      {path: '/waga',
        element : <Waga  handlePushEvent = {handlePushEvent}/>
      }
     ])

  return (
    <>
     <RouterProvider router = {router}>
    
     </RouterProvider>
    
    </>
  )
}

export default App
