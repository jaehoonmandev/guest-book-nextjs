// Cards 컴포넌트

import AddGuestBook from "@/app/components/guest-book/addGuestBook";
import styles from './guestBook.module.css';
import AddedGuestBook from "@/app/components/guest-book/addedGuestBook";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import Loading from "@/app/components/UI/loading/loading";
import React from "react";
import {useGuestBookContext} from "@/app/store/guestBook-context";


export default function GuestBook( {guestBooks,isLoading}:GuestBookProps ) {

    const{isMobile} =useGuestBookContext()

    return (



            <div className={isMobile ? styles.mobileBox : styles.box}>

                <AddGuestBook guestBookLength={guestBooks.length} isLoading={isLoading}/>
                <AddedGuestBook guestBooks={guestBooks} />

                {isLoading && <Loading />}

            </div>
    );
}
