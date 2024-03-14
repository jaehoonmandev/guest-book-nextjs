import styles from "./mobileHeader.module.css";
import React, {useState} from "react";
import {useGuestBookContext} from "@/app/store/guestBook-context";

export default function MobileHeader() {

    const [isExpansion, setIsExpansion] = useState(false);

    const changeHandler = () => {
        setIsExpansion((prevState) => !prevState);
    }

    //context에 등록한 검색조건 State를 변경하기 위해.
    const { orderField,
        changeOrderDirection,
        changeOrderField,
        isLoading,
        error
    } = useGuestBookContext();


    // 로딩중이 아니고, 에러가 없어서 정상 적으로 처리를 할 수 있을 때만 검색 조건을 활성화 시킨다.
    const disabled = isLoading || error !== ""

    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>
                    <a href={""}>Guest Book</a>
                </div>

                <div className={styles.menuTrigger}>


                    <div className={styles.hamburger}>
                        <button onClick={() => changeHandler()}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>


            </div>

            {isExpansion && (
                <div className={`${styles.searchArea} fadeInLeft`}>
                    <div className={styles.sortCondition}>
                        <div>
                            <span>정렬 기준</span>
                        </div>

                        <ul>
                            <li>
                                <span> [ </span>
                            </li>
                            <li>
                                <button
                                    disabled={disabled ? true : false}
                                    className={orderField === 'createdTime' ? styles.active : styles.disabled}
                                    onClick={() => changeOrderField('createdTime')}>날짜
                                </button>
                            </li>
                            <li>
                                <button
                                    disabled={disabled ? true : false}
                                    className={orderField === 'title' ? styles.active : styles.disabled}
                                    onClick={() => changeOrderField('title')}>제목
                                </button>
                            </li>
                            <li>
                                <button
                                    disabled={disabled ? true : false}
                                    className={orderField === 'writer' ? styles.active : styles.disabled}
                                    onClick={() => changeOrderField('writer')}>작성자
                                </button>
                            </li>
                            <li>
                                <span> ] </span>
                            </li>
                        </ul>

                        <ul>
                            <li
                                className={`${styles.toggle} 
                    // /* 좀 더 세세하게 css 컨트롤 하려고 따로... */
                    ${disabled ? styles.toggleDisable : styles.toggleActive}`}>
                                <label>
                                    내림차순
                                    <input
                                        disabled={disabled ? true : false}
                                        role="switch"
                                        type="checkbox"
                                        onClick={() => changeOrderDirection()}
                                    />
                                    오름차순
                                </label>
                            </li>
                        </ul>

                    </div>
                </div>
            )}
        </>

    )
}