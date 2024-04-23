import React, {useEffect, useState} from "react";
import GuestBookModal from "@/app/components/UI/modal/guestBookModal";
import {createPortal} from "react-dom";
import {GuestBook} from "@/app/interfaces/IguestBook";
import styles from "@/app/components/guest-book/guestBook.module.css";


export default function ModifyGuestBook(guestBook: GuestBook) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    //인증을 위한 상태값 설정.
    const [authority, setAuthority] = useState(false)

    // 누른 버튼에 따라 액션을 변경 시킨다.
    const [type, setType] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);


    const changeType = (type : string) =>{
        setType(type)
    }


    const toggleHandler = () => {

        setIsModalOpen((prevIsModalOpen) => {
            //이전 상태가 확장 상태가 아니라면 즉, 현재 사이드바를 확장하는 중이라면
            if(!prevIsModalOpen){
                // body 스크롤을 방지한다
                document.body.style.overflow = 'hidden';
            }else {
                //사이드를 닫는다면 스크롤을 다시 솰성 시킨다.
                document.body.style.removeProperty('overflow');
            }
            return !prevIsModalOpen
        });
    }

    const [modifiedGuestBook, setModifiedGuestBook] = useState(guestBook);

    //인증이 완료 시 authority 상태 값을 변경하여 수정과 삭제 modal을 노출시킨다.
    const authorityConfirm = (PermitCode:string) => {
        // // 인증 완료 상태
        // setAuthority(true);
        // // 인증 완료 후 해당 값 guestBook 객체에 넣어서 REST-API Double-check
        // guestBook.permitCode = PermitCode;

        // 인증 완료 상태
        setAuthority(true);

        // 변경된 guestBook 객체에 permitCode 업데이트
        const updatedGuestBook = { ...modifiedGuestBook };
        updatedGuestBook.permitCode = PermitCode;

        // 업데이트된 값을 setModifiedGuestBook에 저장
        setModifiedGuestBook(updatedGuestBook);
    }

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
                                                    guestBook={modifiedGuestBook}/>
                                                , document.getElementById('portal')!
                                            )
                                        );
                                    case "DELETE":
                                        return (
                                            createPortal(
                                                <GuestBookModal
                                                    toggleHandler={toggleHandler}
                                                    type={"DELETE"}
                                                    guestBook={modifiedGuestBook}/>
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