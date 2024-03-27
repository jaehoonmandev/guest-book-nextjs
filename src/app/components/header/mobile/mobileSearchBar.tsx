import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import styles from './mobileHeader.module.css'
import {useGuestBookContext} from "@/app/store/guestBook-context";

export default function MobileSearchBar(){

    const {
        changeSearchWriter,
        isLoading,
        error,
    } = useGuestBookContext();

    // 로딩중이 아니고, 에러가 없어서 정상 적으로 처리를 할 수 있을 때만 검색 조건을 활성화 시킨다.
    const disabled = isLoading || error !== ""

    const [searchValue , setSearchValue] = useState("")
    //입력 시 searchWriter State 값 변경.
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleClick = () => {
       changeSearchWriter(searchValue)
    }
    const handleKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> ) => {
        if(e.key === `Enter`) changeSearchWriter(searchValue)
    };

    return (
        <div className={styles.searchBar}>
            <label>

                <input
                    disabled={disabled}
                    role="search"
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="작성자로 검색"/>

                <button
                    disabled={disabled}
                    onClick={() => handleClick()}
                />
            </label>
        </div>
    )
}