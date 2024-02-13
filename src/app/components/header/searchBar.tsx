import React, {ChangeEvent, useContext, useState} from "react";
import styles from './header.module.css'
import {useGuestBookContext} from "@/app/store/guestBook-context";
export default function SearchBar(){

    const {
        searchWriter,
        changeSearchWriter,
        orderDirection,
        orderField,
        fetchGuestBooks } = useGuestBookContext();

    //입력 시 searchWriter State 값 변경.
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        changeSearchWriter(event.currentTarget.value);
    }

    const handleClick = () => {
       fetchGuestBooks(orderDirection, orderField, searchWriter);
    }

    return (
        <div className={styles.searchBar}>
            <label>
                <input
                    role="search"
                    type="text"
                    value={searchWriter}
                    onChange={handleChange}
                    placeholder="작성자로 검색"/>
                <button
                    onClick={() => handleClick()}></button>
            </label>
        </div>
    )
}