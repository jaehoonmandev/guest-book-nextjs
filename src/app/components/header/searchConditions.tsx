import React from "react";
import styles from './header.module.css'
export default function SearchConditions(){

    return (
        <div className={styles.sortCondition}>
            <div>
                <span>정렬 기준</span>
            </div>

            <ul>
                <li>
                    <a href="#">날짜</a>
                </li>
                <li>
                    <a href="#">제목</a>
                </li>
                <li>
                    <a href="#">작성자</a>
                </li>
                <li className={styles.toggle}>
                    <label>
                        내림차순
                        <input role="switch" type="checkbox"/>
                        오름차순
                    </label>
                </li>
            </ul>
        </div>
    )
}