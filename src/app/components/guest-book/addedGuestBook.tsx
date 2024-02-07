// AddedCard 컴포넌트
import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useCallback} from "react";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import ModifyGuestBook from "@/app/components/guest-book/modifyGuestBook";

export default function AddedGuestBook({guestBooks}: GuestBookProps) {


    const handleDeleteButtonClick = useCallback((id: string | undefined) => {

        fetch(`/api/guest-book/`,
            {
                method: 'DELETE',
                body: JSON.stringify(id)
            },
        )
        /*.then((response) => response.json())
        .then((data) => {
            setGuestBooks(data)
            setIsLoading(false);
        })*/
    }, []);


    return (
        <>
            {
                guestBooks.map(guestBook => (
                    <div key={guestBook.id} className={styles.addedGuestBookContainer}
                         style={{background: `${guestBook.color}`}}>
                        <div className={styles.addedGuestBook}>
                            <div className={styles.title}>
                                <p>{guestBook.title}</p>
                            </div>
                            <div className={styles.contents}>
                                <pre>{guestBook.contents}</pre>
                            </div>
                            <div className={styles.writeInfo}>
                                <p>{guestBook.writer}</p>

                                <p>{guestBook.createdTime}</p>
                            </div>
                            {/* 수정 기능 */}
                            <div className={styles.modifyButtonContainer}>
                                <ModifyGuestBook {...guestBook}/>
                            </div>
                            {/* 삭제 기능 */}
                            <div className={styles.deleteButtonContainer}>
                                <button className={styles.deleteButton} onClick={() => handleDeleteButtonClick(guestBook.id)}></button>
                            </div>
                        </div>

                    </div>
                ))}
        </>
    );
};

