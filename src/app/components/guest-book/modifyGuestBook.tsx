import React, {useCallback, useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {GuestBook} from "@/app/interfaces/guestBook";
import styles from "@/app/components/guest-book/guestBook.module.css";
import {DELETE} from "@/app/fetch/fetchGuestBook";
import {useGuestBookContext} from "@/app/store/guestBook-context";


export default function ModifyGuestBook(guestBook: GuestBook) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    //인증을 위한 상태값 설정.
    const [authority, setAuthority] = useState(false)

    const {fetchGuestBooks} = useGuestBookContext();
    const [error, setError] = useState("");

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);

    const toggleHandler = () => {
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }

    //permit code를 체크하여
    const authorityConfirm = () => {
        setAuthority(true);
    }

    const handleDeleteButtonClick = useCallback(async (id: string) => {
        try {
            //지연 시간 추가
            //await delay(1000);

            const response = await DELETE(id);

            if (!response.ok) {
                const {error} = await response.json();
                throw new Error(error);
            }


        } catch (error: any) {
            /*setError(error.message);*/
        }

        /*.then((response) => response.json())
        .then((data) => {
            setGuestBooks(data)
            setIsLoading(false);
        })*/
    }, []);
    return (
        <>
            <button className={styles.modifyButton}
                    onClick={toggleHandler}></button>
            <button className={styles.deleteButton}
                    onClick={authority === true ? () => handleDeleteButtonClick(guestBook.id) : toggleHandler}></button>
            {isModalOpen && portalElement
                ?
                authority === true
                    ?
                    (
                        createPortal(
                            <GuestBookModal
                                toggleHandler={toggleHandler}
                                type={"PUT"}
                                guestBook={guestBook}/>
                            , document.getElementById('portal')!
                        )
                    )
                    :
                    (
                        createPortal(
                            <GuestBookModal
                                toggleHandler={toggleHandler}
                                authorityConfirm={authorityConfirm}
                                type={"AUTH"}                                />
                            , document.getElementById('portal')!
                        )
                    )
                :
                (null)
            }

        </>
    )
}