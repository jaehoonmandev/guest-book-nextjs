import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {AddGuestBookProps} from "@/app/interfaces/guestBook";


export default function AddGuestBook({isLoading = true, guestBookLength = 0}:AddGuestBookProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    let [portalElement, setPortalElement] = useState<Element | null>(null);

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);

    const toggleHandler = () => {
        if(!isLoading || guestBookLength > 0){
            setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
        }
    }

    return (
        <>
            <div
                className={`${styles.addGuestBook} addGuestBookHover`}
                onClick={toggleHandler}
                >+
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