import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";


export default function AddGuestBook() {

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
            <div
                className={styles.addGuestBook}
                onClick={toggleHandler}>+
            </div>
            {isModalOpen && portalElement
                ?
                createPortal(
                    <GuestBookModal toggleHandler={toggleHandler} type={"POST"}/>
                    , document.getElementById('portal')!
                )
                :
                null
            }

        </>
    )
}