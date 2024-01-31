import styles from "@/app/components/guest-book/guestBook.module.css";
import React, {useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {GuestBook} from "@/app/interfaces/guestBook";

interface AddGuestBookProps {
    type: string;
    guestBook : GuestBook | null
}


export default function SaveGuestBook(
    {type,guestBook} : AddGuestBookProps,

) {

    /**
     * ModalZone
     */
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [portalElement, setPortalElement] = useState<Element | null>(null);
    const [guestBookData, setGuestBookData] = useState<GuestBook | null>(guestBook);

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);

    const toggleHandler = () => {
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }

    //TODO : 1. 2번씩 불러오는거 수정
    useEffect(() => {
        if (guestBook !== null) {
            setGuestBookData(guestBook);
            console.log(guestBookData);
        }else {
            console.log("none");
        }
    }, [guestBookData]);

    return (
        <>
            {
                type === "add"
                    ?
                        <div
                            className={styles.addGuestBook}
                            onClick={toggleHandler}>+
                        </div>
                    :
                        <button
                            onClick={toggleHandler}>수정
                        </button>
            }
            {isModalOpen && portalElement
                ?
                createPortal(
                    <GuestBookModal toggleHandler={toggleHandler} guestBookData={guestBookData} type={type}/>
                        , document.getElementById('portal')!
                    )
                :
                    null
            }

        </>
    )
}