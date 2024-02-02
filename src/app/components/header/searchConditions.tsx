import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './header.module.css'
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {HtmlContext} from "next/dist/shared/lib/html-context.shared-runtime";
export default function SearchConditions(){

    //context에 등록한 검색조건 State를 변경하기 위해.
    const { changeOrderDirection, changeOrderField} = useGuestBookContext();

    return (
        <div className={styles.sortCondition}>
            <div>
                <span>정렬 기준</span>
            </div>

            <ul>
                <li>
                    <button onClick={() => changeOrderField('createdTime')}>날짜</button>
                </li>
                <li>
                    <button onClick={() => changeOrderField('title')}>제목</button>
                </li>
                <li>
                    <button onClick={() => changeOrderField('writer')}>작성자</button>
                </li>
                <li className={styles.toggle}>
                <label>
                        내림차순
                        <input
                            role="switch"
                            type="checkbox"
                            onClick={changeOrderDirection}
                        />
                        오름차순
                </label>
                </li>
            </ul>
        </div>
    )
}