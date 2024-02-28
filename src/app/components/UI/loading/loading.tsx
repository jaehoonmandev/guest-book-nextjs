import styles from './loading.module.css'
import React from "react";

export default function Loading() {

    //fetched한 갯수만큼 가져오기...(안쓸듯?)
    const makeLoading = (length: number = 0) => {
        const loadingArr = [];

        for (let i = 0; i < length; i++) {
            loadingArr.push(
                <div
                    key={i}
                    className={styles.loading}>
                </div>
            )
        }
        return loadingArr;
    }

    return (
        <div
            className={styles.loading}>
        </div>
        /*<>
        <div className={styles.loadingContainer}>
            <div className={styles.loading}>
            </div>
        </div>
        </>*/
        /*<>
            {makeLoading(fetchedLength)}
        </>*/
    )
        ;
}