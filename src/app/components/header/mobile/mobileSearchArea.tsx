import React from "react";
import styles from './mobileHeader.module.css'

export default function MobileSearchArea({children}: {children: React.ReactNode}){


    return (
            <div className={styles.searchArea}>
                {children}
            </div>
    )
}
