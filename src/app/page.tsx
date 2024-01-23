import styles from './styles/page.module.css'
import React from "react";
import Cards from "@/app/components/card/cards";

export default function Home() {
    return (
        <section className={styles.cardSection}>

            <Cards></Cards>

        </section>


    )
}
