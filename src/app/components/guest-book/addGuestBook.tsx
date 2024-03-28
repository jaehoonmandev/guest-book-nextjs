import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {AddGuestBookProps} from "@/app/interfaces/IguestBook";


export default function AddGuestBook({toggleHandler,isModalOpen}:AddGuestBookProps) {

    let [portalElement, setPortalElement] = useState<Element | null>(null);

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);

    return (
        <>
            <div
                className={`${styles.addGuestBook} addGuestBookHover`}
                onClick={toggleHandler}
                >
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