import styles from './Logo.module.css'



function Logo(){
    return(
        <div className={styles.logo}>
            <span className= 'logoText'>Pet&Care</span>
        </div>
    )
}

export default Logo