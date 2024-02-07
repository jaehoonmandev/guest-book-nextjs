import React, {useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {GuestBook} from "@/app/interfaces/guestBook";
import styles from "@/app/components/guest-book/guestBook.module.css";


export default function ModifyGuestBook(guestBook: GuestBook) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    let [portalElement, setPortalElement] = useState<Element | null>(null);

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);

    const toggleHandler = () => {
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }

    return (
        <>
            <button className={styles.modifyButton} onClick={toggleHandler}> </button>
            {isModalOpen && portalElement
                ?
                createPortal(
                    <GuestBookModal toggleHandler={toggleHandler} type={"PUT"} guestBook={guestBook}/>
                        , document.getElementById('portal')!
                    )
                :
                    null
            }

        </>
    )
}