// AddedCard 컴포넌트
import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useCallback, useState} from "react";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import ModifyGuestBook from "@/app/components/guest-book/modifyGuestBook";
import {DELETE} from "@/app/components/fetch/fetchGuestBook";
import {useGuestBookContext} from "@/app/store/guestBook-context";

export default function AddedGuestBook({guestBooks}: GuestBookProps) {

    const {fetchGuestBooks} = useGuestBookContext();
    const [error, setError] = useState("")
    const handleDeleteButtonClick = useCallback(async (id: string) => {


        try {
            //지연 시간 추가
            //await delay(1000);

            const response = await DELETE(id);

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }


        } catch (error: any) {
            setError(error.message);
        }

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

                                <p>{guestBook.createdTime.toLocaleString()}</p>
                            </div>
                            {/*/!* 수정 기능 *!/*/}
                            {/*<div className={styles.modifyButtonContainer}>*/}
                            {/*    <ModifyGuestBook {...guestBook}/>*/}
                            {/*</div>*/}
                            {/*/!* 삭제 기능 *!/*/}
                            {/*<div className={styles.deleteButtonContainer}>*/}
                            {/*    <button className={styles.deleteButton} onClick={() => handleDeleteButtonClick(guestBook.id)}></button>*/}
                            {/*</div>*/}
                        </div>
                        <div className={styles.addedGuestBookOverlay}>
                            <ModifyGuestBook {...guestBook}/>
                            <button className={styles.deleteButton}
                                    onClick={() => handleDeleteButtonClick(guestBook.id)}></button>
                        </div>

                    </div>
                ))}
        </>
    );
};

