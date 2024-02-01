
import styles from '../error/error.module.css'
export default function GuestBookConnectError({errorMessage} : { errorMessage: string }){
    return(
        <div className={styles.guestBookConnectError}>
            <p>{errorMessage}</p>
        </div>
    )
}