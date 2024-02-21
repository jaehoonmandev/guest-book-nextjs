// AddedCard 컴포넌트
import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useCallback, useState} from "react";
import {GuestBook, GuestBookProps} from '@/app/interfaces/guestBook'
import ModifyGuestBook from "@/app/components/guest-book/modifyGuestBook";
import {DELETE} from "@/app/fetch/fetchGuestBook";
import {useGuestBookContext} from "@/app/store/guestBook-context";

export default function AddedGuestBook({guestBooks}: GuestBookProps) {


    return (
        <>
            {
                guestBooks.map(guestBook => (
                    <div
                        key={guestBook.id}
                        className={styles.addedGuestBookContainer}
                        style={{background: `${guestBook.color}`}}>
                        {/*style={{background: `radial-gradient(circle, ${guestBook.color}, #FFF)`}}>*/}
                        <div className={styles.addedGuestBook}>
                            <div className={styles.title}>
                                <p>{guestBook.title}</p>
                            </div>
                            <div className={styles.contents}>
                                <pre>{guestBook.contents}</pre>
                            </div>
                            <div className={styles.writeInfo}>
                                <p>{guestBook.writer}</p>

                                <p>{guestBook.createdTime.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className={styles.addedGuestBookOverlay}>
                            <ModifyGuestBook {...guestBook}/>
                        </div>
                    </div>
                ))}
        </>
    );
};

