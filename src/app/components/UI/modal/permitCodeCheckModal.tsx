import styles from "@/app/components/UI/form/form.module.css";
import {PermitCodeCheckProps} from "@/app/interfaces/modal";
import React, {FormEvent, useState} from "react";
import {CheckPermitCode} from "@/app/guestBookAPI/OtherAction";
import {isBlank} from "@/app/utility/formDataValid";
import FormButton from "@/app/components/UI/form/formButton";
import MakeDelay from "@/app/utility/makeDelay";
import SuccessEffect from "@/app/components/UI/success/successCheckmark";

export default function PermitCodeCheckModal({toggleHandler, authorityConfirm, guestBookId}: PermitCodeCheckProps) {

    const [permitCode, setPermitCode] = useState("")

    const [permitResult, setPermitResult] = useState({
        message: "",
        result:false
    });
    const [valid, setValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [failCount, setFailCount] = useState(0)

    const [error, setError] = useState("")

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setPermitCode(event.currentTarget.value);
    }

    const handleReset = () =>{
        setPermitCode("");
    }

    const checkValid = (permitCode: string) => {
        return isBlank(permitCode);
    }

    async function checkPermitCode(event: FormEvent) {
        event.preventDefault();

        setPermitResult({
            message: "",
            result: false
        });

        //입력한 데이터 검증
        if (!checkValid(permitCode)) {

            setValid(true);
            setIsLoading(true);

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

                // setError(error.message);
            }
        } else {
            setValid(false)
        }

        setIsLoading(false)
    }

    return (
        <div
            /*toggleHandler가 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={`${styles.formBox} fadeInAnimation` }>


            {permitResult.result
                ? (


                     // <span>{permitResult.message}</span>
                    <SuccessEffect/>


                )
                : (
                    <>
                        <h2>권한 확인</h2>

                        {isLoading && !permitResult.result && <span>권한 확인중...</span>}

                        <form className={styles.form} onSubmit={checkPermitCode}>
                            <input type={"hidden"} name={"id"} value={guestBookId}/>
                            <label>
                                <p>인증코드</p>
                                <input type="password"
                                       name="permitCode"
                                       value={permitCode}
                                       maxLength={20}
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


        </div>
    )
}