import React from "react";
import styles from "./requesting.module.css"

export default function RequestLoading(){
    // by https://codepen.io/cvan/pen/LYYXzWZ
    return (
        <div className={styles.requestLoading}>
            <div className={styles.loadingDots}>
                <div className={`${styles.loadingDot} loadingDotAnimation`}></div>
                <div className={`${styles.loadingDot} loadingDotAnimation`}></div>
                <div className={`${styles.loadingDot} loadingDotAnimation`}></div>
                <div className={`${styles.loadingDot} loadingDotAnimation`}></div>
                <div className={`${styles.loadingDot} loadingDotAnimation`}></div>
            </div>

            <div className={styles.description}>
                <span>요청 중...</span>
            </div>


        </div>
    )

}