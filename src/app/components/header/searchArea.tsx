
import React from "react";
import styles from './header.module.css'
export default function SearchArea({children}: {children: React.ReactNode}){
    return (
        <div className={styles.searchArea}>
            {children}
        </div>
    )
}
