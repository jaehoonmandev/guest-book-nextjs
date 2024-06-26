// AddedCard 컴포넌트
import styles from "@/app/components/guest-book/guestBook.module.css";
import React from "react";
import {AddedGuestBookProps} from '@/app/interfaces/IguestBook'
import ModifyGuestBook from "@/app/components/guest-book/modifyGuestBook";

export default function AddedGuestBook({guestBooks}: AddedGuestBookProps) {

    return (
        <>
            {
                guestBooks.map(guestBook => (
                    <div
                        key={guestBook.id}
                        className={`${styles.addedGuestBookContainer} fadeInAnimation`  }
                        style={{background: `var(--${guestBook.color})`}}
                    >
                        <div className={styles.addedGuestBook}>

                            <div className={styles.title}>
                                <p>{guestBook.title}</p>
                            </div>

                            <div className={styles.contents}>
                                <pre>{guestBook.contents}</pre>
                            </div>

                            {/*<div className={styles.writeInfo}>*/}
                            <div className={styles.end}>
                                <div className={styles.functions}>
                                    <ModifyGuestBook {...guestBook}/>
                                </div>
                                <div className={styles.writeInfo}>
                                    <p>{guestBook.writer}</p>
                                    <p>{guestBook.createdTime.toLocaleString()}</p>
                                </div>

                            </div>

                        </div>
                        {/*<div className={styles.addedGuestBookOverlay}>*/}
                        {/*    <ModifyGuestBook {...guestBook}/>*/}
                        {/*</div>*/}
                    </div>
                ))}
        </>
    );
};

