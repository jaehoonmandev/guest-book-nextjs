import React from "react";
import AddCard from "@/app/components/card/addCard";
import AddedCard from "@/app/components/card/addedCard";
import styles from './card.module.css'
export default function Cards(){
    return (
        <div className={styles.box}>
            <AddCard/>
            <AddedCard/>

        </div>
    );
}