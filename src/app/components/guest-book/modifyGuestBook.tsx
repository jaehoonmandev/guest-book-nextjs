import React, {useCallback, useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {GuestBook} from "@/app/interfaces/guestBook";
import styles from "@/app/components/guest-book/guestBook.module.css";
import {DELETE} from "@/app/guestBookAPI/APIComponent";


export default function ModifyGuestBook(guestBook: GuestBook) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    //인증을 위한 상태값 설정.
    const [authority, setAuthority] = useState(false)


    const [type, setType] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);


    const changeType = (type : string) =>{
        setType(type)
    }

    const toggleHandler = () => {
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }

    //permit code를 체크하여
    const authorityConfirm = () => {
        setAuthority(true);
    }


    //데이터 삭제.
    const handleDeleteButtonClick = useCallback(async (id: string) => {
        try {

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
            {/*수정 버튼*/}
            <button className={styles.modifyButton}
                    onClick={
                        () => {
                            changeType("PUT");
                            toggleHandler();
                        }
                    }
            ></button>

            {/*삭제 버튼*/}
            <button className={styles.deleteButton}
                    onClick={
                        () => {
                            changeType("DELETE");
                            toggleHandler();
                        }
                    }
            ></button>
            {/*Modal을 Open 시켰으며, Modal이 띄워질 위치가 확인되면*/}
            {isModalOpen && portalElement
                ?
                // 인증 과정을 거치고 상태에 따라 인증창과 변경창이 뜬다
                authority
                    ?
                    (
                        <>
                            {(() => {
                                switch (type) {
                                    case "PUT":
                                        return (
                                            createPortal(
                                                <GuestBookModal
                                                    toggleHandler={toggleHandler}
                                                    type={"PUT"}
                                                    guestBook={guestBook}/>
                                                , document.getElementById('portal')!
                                            )
                                        );
                                    case "DELETE":
                                        return (
                                            createPortal(
                                                <GuestBookModal
                                                    toggleHandler={toggleHandler}
                                                    type={"DELETE"}
                                                    guestBookId={guestBook.id}/>
                                                , document.getElementById('portal')!
                                            )
                                        );
                                    default:
                                        return null;
                                }

                            })()}
                        </>

                    )
                    :
                    (
                        createPortal(
                            <GuestBookModal
                                toggleHandler={toggleHandler}
                                authorityConfirm={authorityConfirm}
                                guestBookId={guestBook.id}
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