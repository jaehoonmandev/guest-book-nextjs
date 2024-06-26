import Backdrop from "@/app/components/UI/modal/backdrop";

import {ModalProps} from "@/app/interfaces/Imodal";
import GuestBookPOST from "@/app/components/UI/form/guestBookPOST";
import GuestBookPUT from "@/app/components/UI/form/guestBookPUT";
import PermitCodeCheckForm from "@/app/components/UI/form/checkPermitCodeForm";
import RequestLoading from "@/app/components/UI/requesting/requestLoading";
import styles from "@/app/components/UI/form/form.module.css";
import React, {useState} from "react";
import SuccessEffect from "@/app/components/UI/requesting/successCheckmark";
import ConfirmDeleteForm from "@/app/components/UI/form/confirmDeleteForm";

export default function GuestBookModal(
    {toggleHandler, type, guestBook, authorityConfirm, guestBookId = ""}: ModalProps,) {

    /**
     * 색상 Modal 요소에 넘겨주기.
     * 해당 이름들은 Global에 :root로 CSS 변수화 되어있다.
     */

    const colors = [
        "palette1", "palette2", "palette3", "palette4", "palette5",
    ]

    const [isModalLoading, setIsModalLoading] = useState(false);
    const [requestResult, setRequestResult] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const changeLoadingState = (flag : boolean) => {
        // setIsModalLoading((prevState) => !prevState);
        setIsModalLoading(flag);
    }

    const changeRequestResult = (flag : boolean) => {
        // setRequestResult((prevState) => !prevState);
        setRequestResult(flag);
    }

    const changeErrorMsg = (msg : string) => {
        setErrorMsg(msg);
    }

    return (
        <>
            <Backdrop toggleHandler={toggleHandler}>

                <div
                    /*toggleHandler가 form(자식) div에 전파 안되게 방지*/
                    onClick={(e) => e.stopPropagation()}
                    className={`${styles.formBox} fadeInAnimation`}>

                    {errorMsg && <span> {errorMsg} </span>}

                    {/*중첩 if문 아름답다.*/}
                    {requestResult
                        ? (<SuccessEffect/>)
                        : (
                            isModalLoading
                                ? (<RequestLoading/>)
                                : (
                                    <>
                                        {(() => {

                                            switch (type) {
                                                case "POST":
                                                    return (
                                                        <GuestBookPOST
                                                            toggleHandler={toggleHandler}
                                                            colors={colors}
                                                            changeLoadingState={changeLoadingState}
                                                            changeRequestResult={changeRequestResult}
                                                            changeErrorMsg={changeErrorMsg}
                                                        />
                                                    );
                                                case "PUT":
                                                    return (
                                                        <GuestBookPUT
                                                            toggleHandler={toggleHandler}
                                                            guestBook={guestBook}
                                                            colors={colors}
                                                            changeLoadingState={changeLoadingState}
                                                            changeRequestResult={changeRequestResult}
                                                            changeErrorMsg={changeErrorMsg}
                                                        />
                                                    );
                                                case "DELETE":
                                                    return (
                                                        <ConfirmDeleteForm
                                                            toggleHandler={toggleHandler}
                                                            guestBook={guestBook}
                                                            changeLoadingState={changeLoadingState}
                                                            changeRequestResult={changeRequestResult}
                                                            changeErrorMsg={changeErrorMsg}
                                                        />
                                                    );

                                                case "AUTH":
                                                    return (
                                                        <PermitCodeCheckForm
                                                            guestBookId={guestBookId}
                                                            toggleHandler={toggleHandler}
                                                            authorityConfirm={authorityConfirm}
                                                            changeLoadingState={changeLoadingState}
                                                            changeRequestResult={changeRequestResult}
                                                            changeErrorMsg={changeErrorMsg}
                                                        />
                                                    );

                                                default:
                                                    return null;
                                            }

                                        })()}
                                    </>
                                )


                        )
                    }


                </div>

            </Backdrop>
        </>

    )
}