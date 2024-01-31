// Cards 컴포넌트

import SaveGuestBook from "@/app/components/guest-book/saveGuestBook";
import styles from './guestBook.module.css';
import AddedGuestBook from "@/app/components/guest-book/addedGuestBook";
import {GuestBookProps} from '@/app/interfaces/guestBook'


export default function GuestBook({guestBooks} : GuestBookProps) {


    return (
        <div className={styles.box}>
                <SaveGuestBook type='add' guestBook={null}/>
                <AddedGuestBook guestBooks={guestBooks} />
        </div>
    );
}
