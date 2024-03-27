import styles from "@/app/components/header/mobile/mobileHeader.module.css";
import React from "react";


export default function MobileMenuTrigger({changeHandler, isExpansion} : {changeHandler:()=>void, isExpansion: boolean}) {

    return (
        <div className={`${styles.menuTrigger} ${isExpansion && styles.active}`}>
                <button onClick={() => changeHandler()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
        </div>
    )

}