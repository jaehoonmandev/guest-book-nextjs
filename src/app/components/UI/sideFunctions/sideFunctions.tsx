import styles from "@/app/components/UI/sideFunctions/sideFunctions.module.css";
import React from "react";

export default function SideFunctions({toggleHandler}:{toggleHandler:()=> void}) {


    //상단으로 스크롤 이동
    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }

    return (

        <div className={styles.sideFunctions}>

            <button className={`${styles.scrollToTop} ${styles.background}`} onClick={scrollToTop}>
            </button>

            <button className={`${styles.sideAddGuestBook} ${styles.background}`} onClick={toggleHandler}>
            </button>

        </div>
    )
}