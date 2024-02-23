
import Backdrop from "@/app/components/UI/modal/backdrop";

import {ModalProps} from "@/app/interfaces/modal";
import GuestBookPOST from "@/app/components/UI/form/guestBookPOST";
import GuestBookPUT from "@/app/components/UI/form/guestBookPUT";
import PermitCodeCheckModal from "@/app/components/UI/modal/permitCodeCheckModal";

export default function GuestBookModal(
    {toggleHandler, type, guestBook, authorityConfirm,guestBookId=""} : ModalProps,) {

    //color 픽을 위한 배열
    const colors = [
        {
            color : "yellow",
            value : "#FDF1AA"
        },
        {
            color : "green",
            value : "#D3F3B0"
        },
        {
            color : "red",
            value : "#FE9292"
        },
        {
            color : "pink",
            value : "#FEC3F9"
        },
        {
            color : "blue",
            value : "#98DBFA"
        },
    ]

    return (
        <>
            <Backdrop toggleHandler={toggleHandler}>


                {(() => {
                    switch (type) {
                        case "POST":
                            return (
                                <GuestBookPOST
                                    toggleHandler={toggleHandler}
                                    colors={colors}/>
                            );
                        case "PUT":
                            return (
                                <GuestBookPUT
                                    toggleHandler={toggleHandler}
                                    guestBook={guestBook}
                                    colors={colors}/>
                            );
                        case "AUTH":
                            return (
                                <PermitCodeCheckModal
                                    guestBookId={guestBookId}
                                    authorityConfirm={authorityConfirm}
                                    toggleHandler={toggleHandler}/>
                            );
                        default:
                            return null;
                    }
                })
                ()}
            </Backdrop>
        </>

    )
}