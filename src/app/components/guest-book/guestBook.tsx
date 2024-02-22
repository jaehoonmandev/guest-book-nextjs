// Cards 컴포넌트

import AddGuestBook from "@/app/components/guest-book/addGuestBook";
import styles from './guestBook.module.css';
import AddedGuestBook from "@/app/components/guest-book/addedGuestBook";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import Loading from "@/app/components/UI/loading/loading";


export default function GuestBook( {fetchedLength, guestBooks, isLoading}:GuestBookProps ) {
    return (
            <div className={styles.box}>

                <AddGuestBook />
                <AddedGuestBook guestBooks={guestBooks} />

                {isLoading && <Loading fetchedLength={fetchedLength}/>}
            </div>
    );
}
