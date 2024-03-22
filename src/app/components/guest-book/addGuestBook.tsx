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

            setIsModalOpen((prevIsModalOpen) => {
                //이전 상태가 확장 상태가 아니라면 즉, 현재 사이드바를 확장하는 중이라면
                if(prevIsModalOpen === false){
                    // body 스크롤을 방지한다
                    document.body.style.overflow = 'hidden';
                }else {
                    //사이드를 닫는다면 스크롤을 다시 솰성 시킨다.
                    document.body.style.removeProperty('overflow');
                }
                return !prevIsModalOpen
            });
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