import styles from "@/app/components/UI/form/form.module.css";
import {DeleteModalProps, PermitCodeCheckProps} from "@/app/interfaces/modal";
import React, {FormEvent, useCallback, useState} from "react";
import {CheckPermitCode} from "@/app/guestBookAPI/OtherAction";
import {isBlank} from "@/app/utility/formDataValid";
import FormButton from "@/app/components/UI/form/formButton";
import MakeDelay from "@/app/utility/makeDelay";
import {DELETE} from "@/app/guestBookAPI/APIComponent";
import {useGuestBookContext} from "@/app/store/guestBook-context";

export default function ConfirmDeleteForm({
                                              guestBookId,
                                              toggleHandler,
                                              changeLoadingState,
                                              changeRequestResult,
                                              changeErrorMsg
                                            }: DeleteModalProps) {



    const {changeAddOrModFlicker} =useGuestBookContext()

    //데이터 삭제.
    const handleDeleteButtonClick = useCallback(async () => {

        changeErrorMsg("");

        changeLoadingState(true);

        try {

            const response = await DELETE(guestBookId);

            if (!response.ok) {
                const {error} = await response.json();
                throw new Error(error);
            }

            const result = await response.json();

            await MakeDelay();

            if (result.result) {
                changeRequestResult(true);

                //딜레이
                await MakeDelay();

                // 성공적으로 폼 제출 후 모달 닫기
                toggleHandler();

                changeAddOrModFlicker();
            }else{

            }

        } catch (error: any) {
            changeErrorMsg(error.message);
        }

        changeRequestResult(false); //인증 코드 검증은 authority 상태 값에 따라 렌더링이 달라지기에 초기화 값으로 되돌리기.
        changeLoadingState(false);

    }, []);

    return (

        <>
            <h2>삭제 확인</h2>

            <div className={styles.deleteConfirm}>

                <h3> 진짜로 삭제하냐?</h3>

                <div className={styles.deleteButtonDiv}>
                        <button className={styles.cancleBtn} onClick={toggleHandler}>취소</button>
                        <button className={styles.submitBtn} onClick={handleDeleteButtonClick}>삭제</button>
                </div>
            </div>


        </>
    )
}
