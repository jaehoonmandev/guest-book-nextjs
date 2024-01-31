
import styles from '../error/error.module.css'
export default function GuestBookConnectError(){
    return(
        <div className={styles.guestBookConnectError}>
            <p>데이터를 불러올 수 없습니다.</p>
        </div>
    )
}