import React, {useEffect, useState} from "react";
import {ModalContextProps} from "@/app/interfaces/modal";
import ModalContext from "@/app/store/modal-context";


export function ModalProvider({ children }: { children: React.ReactNode; }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [portalElement, setPortalElement] = useState<Element | null>(null);
    //const [guestBook, setGuestBookData] = useState<GuestBook | null>();

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [isModalOpen]);

    const toggleHandler = () => {
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }


    const contextValue: ModalContextProps = {
        isModalOpen,
        portalElement,
        toggleHandler,
        //guestBook
    };

    return(
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    )

}

