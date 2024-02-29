// AddedCard 컴포넌트
import styles from "@/app/components/guest-book/guestBook.module.css";
import React from "react";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import ModifyGuestBook from "@/app/components/guest-book/modifyGuestBook";

export default function AddedGuestBook({guestBooks}: GuestBookProps) {

    return (
        <>
            {
                guestBooks.map(guestBook => (
                    <div
                        key={guestBook.id}
                        className={styles.addedGuestBookContainer}
                        style={{background: `var(--${guestBook.color})`}}
                    >
                        {/*style={{background: `linear-gradient(150deg ,#fff 1%,${guestBook.color} 99%, #FFF)`}}>*/}
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

