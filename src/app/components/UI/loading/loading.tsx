import styles from './loading.module.css'

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingText}>로딩 중</div>
        </div>
    );
}