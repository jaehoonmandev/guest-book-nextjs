
import Backdrop from "@/app/components/UI/modal/backdrop";

import {ModalProps} from "@/app/interfaces/modal";
import GuestBookPOST from "@/app/components/UI/form/guestBookPOST";
import GuestBookPUT from "@/app/components/UI/form/guestBookPUT";

export default function GuestBookModal( {toggleHandler, type, guestBook} : ModalProps,) {



    return (
        <>
            <Backdrop toggleHandler={toggleHandler}>
                {type === 'POST'
                    ? (
                        <GuestBookPOST
                            toggleHandler={toggleHandler}>
                        </GuestBookPOST>
                    )
                    : (
                        <GuestBookPUT
                            toggleHandler={toggleHandler} guestBook={guestBook}>
                        </GuestBookPUT>
                    )

                }
            </Backdrop>
        </>

    )
}