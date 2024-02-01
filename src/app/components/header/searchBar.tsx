import React from "react";
import styles from './header.module.css'
export default function SearchBar(){
    return (
        <div className={styles.searchBar}>
            <label>
                <input role="search" type="text" placeholder="작성자로 검색"/>
                <button></button>
            </label>
        </div>
    )
}