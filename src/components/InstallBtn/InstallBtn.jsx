import styles from './InstallBtn.module.css'
import { useEffect,useState } from 'react'

function InstallBtn(){
const [seeButton,setSeeButton] = useState(false)
const [installEvent,setInstallEvent] = useState(null)
const installApp = async ()=>{
    if(installEvent){

    const userChoice = await installEvent.prompt()
    if(userChoice.outcome === 'accepted'){
        setSeeButton(false)
        setInstallEvent(null)
    }
}


}
useEffect(()=>{
    const handleCatchEvent = (e)=>{
        e.preventDefault()
        setSeeButton(true)
        setInstallEvent(e)
    }

    window.addEventListener('beforeinstallprompt', (e)=>{handleCatchEvent(e)})
},[])


    return(
        <>
        {seeButton ? <button onClick={installApp} className={styles.Ibtn}>
            Install 
        </button> : null  }
        </>
        
    )
}

export default  InstallBtn