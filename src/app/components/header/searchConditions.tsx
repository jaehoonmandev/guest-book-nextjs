import React from "react";
import styles from './header.module.css'
export default function SearchConditions(){
    return (
        <div className={styles.sortCondition}>
            <div>
                <span>Sort By</span>
            </div>

            <ul>
                <li>Date</li>
                <li>Title</li>
                <li>Writer</li>
                <li className={styles.toggle}>
                    <label>
                        <span>DES</span>
                        <input role="switch" type="checkbox"/>
                        <span>AES</span>
                    </label>
                </li>
            </ul>



        </div>
    )
}