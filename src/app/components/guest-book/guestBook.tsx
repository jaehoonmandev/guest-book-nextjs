// Cards 컴포넌트

import AddGuestBook from "@/app/components/guest-book/addGuestBook";
import styles from './guestBook.module.css';
import AddedGuestBook from "@/app/components/guest-book/addedGuestBook";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import Loading from "@/app/components/UI/loading/loading";
import React from "react";


export default function GuestBook( {guestBooks,isLoading,isMobile}:GuestBookProps ) {
    return (



            <div className={isMobile ? styles.boxMobile : styles.box}>

                <AddGuestBook guestBookLength={guestBooks.length} isLoading={isLoading}/>
                <AddedGuestBook guestBooks={guestBooks} />

                {isLoading && <Loading />}

            </div>
    );
}
