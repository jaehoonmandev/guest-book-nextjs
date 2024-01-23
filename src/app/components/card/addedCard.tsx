import styles from "@/app/components/card/card.module.css";
import React from "react";

export default function AddedCard() {
    return (
        <div className={styles.addedCard}>
            <div className={styles.title}>
                    <span>
                        Title
                    </span>
            </div>
            <div className={styles.contents}>
                    <pre>
                        Contents
                    </pre>
            </div>
            <div className={styles.writeInfo}>
                    <span>
                        Writer
                    </span>
                <span>
                        date
                    </span>
            </div>
        </div>
    )
}