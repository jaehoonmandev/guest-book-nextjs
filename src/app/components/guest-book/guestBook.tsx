// Cards 컴포넌트

import AddGuestBook from "@/app/components/guest-book/addGuestBook";
import styles from './guestBook.module.css';
import AddedGuestBook from "@/app/components/guest-book/addedGuestBook";
import {GuestBookProps} from '@/app/interfaces/guestBook'
import {ModalProvider} from "@/app/store/modal-provider";


export default function GuestBook( {guestBooks}:GuestBookProps ) {


    return (
        <ModalProvider>
            <div className={styles.box}>
                <AddGuestBook />
                <AddedGuestBook guestBooks={guestBooks} />
            </div>
        </ModalProvider>
    );
}
