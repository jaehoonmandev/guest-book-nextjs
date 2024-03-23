import styles from "@/app/components/header/mobile/mobileHeader.module.css";
import React from "react";


export default function MobileMenuTrigger({changeHandler} : {changeHandler:()=>void}) {

    return (
        <div className={styles.menuTrigger}>
            <div className={styles.hamburger}>
                <button onClick={() => changeHandler()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    )

}