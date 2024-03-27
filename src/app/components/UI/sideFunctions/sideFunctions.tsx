import styles from "@/app/components/UI/sideFunctions/sideFunctions.module.css";
import React, {useEffect, useState} from "react";

export default function SideFunctions({toggleHandler}:{toggleHandler:()=> void}) {

    const [showButton, setShowButton] = useState(false);

    //일정 위치 이상 스크롤 했을 때만 보여주기
    useEffect(() => {
        const ShowButtonClick = () => {
            if (window.scrollY > 400) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }
        window.addEventListener("scroll", ShowButtonClick)
        return () => {
            window.removeEventListener("scroll", ShowButtonClick)
        }
    }, [])

    //상단으로 스크롤 이동
    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }

    return (

            <div className={`${styles.sideFunctions} ${showButton && styles.active } `}>

                <button className={`${styles.scrollToTop} ${styles.background}`} onClick={scrollToTop}>
                </button>

                <button className={`${styles.sideAddGuestBook} ${styles.background}`} onClick={toggleHandler}>
                </button>

            </div>

    )
}