import React from "react";
import styles from './header.module.css'
export default function SearchBar(){
    return (
        <div className={styles.searchBar}>
            <label>
                <input role="search" type="text" placeholder="Search as Writer"/>
                <button></button>
            </label>
        </div>
    )
}