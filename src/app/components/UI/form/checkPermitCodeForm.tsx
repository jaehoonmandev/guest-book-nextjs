import styles from "@/app/components/UI/form/form.module.css";
import {PermitCodeCheckProps} from "@/app/interfaces/Imodal";
import React, {FormEvent, useState} from "react";
import {CheckPermitCode} from "@/app/guestBookAPI/OtherAction";
import {isBlank} from "@/app/utility/formDataValid";
import FormButton from "@/app/components/UI/form/formButton";
import MakeDelay from "@/app/utility/makeDelay";

export default function CheckPermitCodeForm({
                                                guestBookId,
                                                toggleHandler,
                                                authorityConfirm,
                                                changeLoadingState,
                                                changeRequestResult,
                                                changeErrorMsg
                                            }: PermitCodeCheckProps) {

    const [permitCode, setPermitCode] = useState("")

    const [permitResult, setPermitResult] = useState({
        message: "",
        result: false
    });
    const [valid, setValid] = useState(true)

    const [failCount, setFailCount] = useState(0)


    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setPermitCode(event.currentTarget.value);
    }

    const handleReset = () => {
        setPermitCode("");
    }

    const validation = () => {
        return !isBlank(permitCode);
    }


    // 인증 코드 검사
    async function checkPermitCode(event: FormEvent) {
        event.preventDefault();

        setPermitResult({
            message: "",
            result: false
        });

        changeErrorMsg("");

        //입력한 데이터 검증
        if (validation()) {

            setValid(true);
            changeLoadingState(true);
            // setIsLoading(true);

            try {
                // DB에 등록된 값과 비교.
                const response = await CheckPermitCode(guestBookId, permitCode);

                if (!response.ok) {
                    const {error} = await response.json();
                    throw new Error(error);
                }

                const result = await response.json();

                //딜레이
                await MakeDelay();

                //일치 여부
                if (result.result) {
                    setPermitResult({
                        message: "인증 성공",
                        result: true
                    });

                    changeRequestResult(true)

                    //딜레이
                    await MakeDelay();

                    //authority 상태 값 변경으로 인증 modal 더 이상 노출되지 않게.
                    authorityConfirm && authorityConfirm()
                    //toggleHandler()
                } else {
                    setPermitResult({
                        message: "다시 시도하세요",
                        result: false
                    });
                }
            } catch (error: any) {
                changeErrorMsg(error.message);
            }
        } else {
            setValid(false)
        }
        changeRequestResult(false); //인증 코드 검증은 authority 상태 값에 따라 렌더링이 달라지기에 초기화 값으로 되돌리기.
        changeLoadingState(false);
        // setIsLoading(false)
    }

    const maxLength = 15
    return (

        <>

            <h2>권한 확인</h2>

            <form className={styles.form} onSubmit={checkPermitCode}>
                <input type={"hidden"} name={"id"} value={guestBookId}/>
                <label>
                    <p>인증코드</p>
                    <input type="password"
                           name="permitCode"
                           value={permitCode}
                           maxLength={maxLength}
                           onChange={handleChange}
                    />
                    {!valid && <span className={styles.invalid}>인증코드를 입력해주세요.</span>}
                    {permitResult.message.length > 0 &&
                        <span className={styles.invalid}> {permitResult.message}</span>}
                    <FormButton
                        handleReset={handleReset}
                        toggleHandler={toggleHandler}
                        action={"확인"}/>
                </label>
            </form>

        </>
    )
}
