import React, {ChangeEvent, useContext, useState} from "react";
import styles from './header.module.css'
import {useGuestBookContext} from "@/app/store/guestBook-context";
export default function SearchBar(){

    const {
        changeSearchWriter,
        isLoading,
    } = useGuestBookContext();

    const [searchValue , setSearchValue] = useState("")
    //입력 시 searchWriter State 값 변경.
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleClick = () => {
       changeSearchWriter(searchValue)
    }

    return (
        <div className={styles.searchBar}>
            <label>
                <input
                    disabled={isLoading === true ? true : false}
                    role="search"
                    type="text"
                    onChange={handleChange}
                    placeholder="작성자로 검색"/>
                <button
                    disabled={isLoading === true ? true : false}
                    onClick={() => handleClick()}></button>
            </label>
        </div>
    )
}