// AddedCard 컴포넌트
import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useCallback} from "react";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import ModifyGuestBook from "@/app/components/guest-book/modifyGuestBook";

export default function AddedGuestBook( {guestBooks}:GuestBookProps) {


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
                <div key={guestBook.id} className={styles.addedGuestBook} style={{background: `${guestBook.color}`}}>
                    <div className={styles.title}>
                        <span>{guestBook.title}</span>
                    </div>
                    <div>
                        <pre>{guestBook.contents}</pre>
                    </div>
                    <div className={styles.writeInfo}>
                        <span>{guestBook.writer}</span>

                        <span>{guestBook.createdTime}</span>
                    </div>
                    <button onClick={() => handleDeleteButtonClick(guestBook.id)}> 삭제</button>
                    <ModifyGuestBook {...guestBook}/>
                </div>
            ))}
        </>
    );
};

