import React from "react";
import styles from './backdrop.module.css'
interface ModalProps {
    toggleHandler: () => void;
    children: React.ReactNode
}
export default function Backdrop( {toggleHandler,children}:ModalProps, ) {

    return(
        <div className={styles.modalBackdrop} onClick={toggleHandler}>
            {children}
        </div>
    )


}