import styles from './loading.module.css'
import React from "react";
import {LoadingProps} from "@/app/interfaces/loading";

export default function Loading({fetchedLength}: LoadingProps) {

    const makeLoading = (length: number = 0) => {
        const loadingArr = [];

        for (let i = 0; i < length; i++) {
            loadingArr.push(
                <div className={styles.loading}>
                </div>
            )
        }
        return loadingArr;
    }

    return (
        /*<div className={styles.loading}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingText}>로딩 중</div>
        </div>*/
        /*<>
        <div className={styles.loadingContainer}>
            <div className={styles.loadingDiv1}>
            </div>
        </div>
        <div className={styles.loadingContainer}>

            <div className={styles.loadingDiv2}>
            </div>

        </div>
        <div className={styles.loadingContainer}>
            <div className={styles.loadingDiv3}>
            </div>
        </div>
        </>*/
        <>
            {makeLoading(fetchedLength)}
        </>
    )
        ;
}