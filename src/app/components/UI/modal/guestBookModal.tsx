
import Backdrop from "@/app/components/UI/modal/backdrop";

import GuestBookForm from "@/app/components/UI/form/guestBookForm";

import {ModalProps} from '@/app/interfaces/guestBook'

export default function GuestBookModal( {toggleHandler, guestBookData, type} : ModalProps,) {

    return (
        <>
            <Backdrop toggleHandler={toggleHandler}>
                <GuestBookForm
                    toggleHandler={toggleHandler} guestBookData={guestBookData} type={type}></GuestBookForm>
            </Backdrop>
        </>

    )
}