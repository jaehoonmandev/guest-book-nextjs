import styles from "@/app/components/UI/form/form.module.css";
import {PermitCodeCheckProps} from "@/app/interfaces/modal";
import {FormEvent, useState} from "react";
import {CheckPermitCode} from "@/app/guestBookAPI/OtherAction";
import {isBlank} from "@/app/utility/formDataValid";
import FormButton from "@/app/components/UI/form/formButton";
import MakeDelay from "@/app/utility/makeDelay";

export default function PermitCodeCheckModal({toggleHandler, authorityConfirm, guestBookId}: PermitCodeCheckProps) {

    const [permitCode, setPermitCode] = useState("")

    const [result, setResult] = useState(false);
    const [valid, setValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
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


        if (!checkValid(permitCode)) {



            setValid(true);
            setIsLoading(true);

            try {
                const response = await CheckPermitCode(guestBookId, permitCode);

                if (!response.ok) {
                    const {error} = await response.json();
                    throw new Error(error);
                }

                const result = await response.json();

                await MakeDelay();

                if (result.result) {
                    setResult(true)
                    //authorityConfirm && authorityConfirm()
                    //toggleHandler()
                } else {
                    setResult(false)
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
            className={styles.formBox}>
            <h2>인증코드 검증</h2>

            {isLoading && <span>검증중</span>}

            {result
                ? (<span>인증에 성공했습니다.</span>)
                : (
                    <form className={styles.form} onSubmit={checkPermitCode}>
                        <input type={"hidden"} name={"id"} value={guestBookId}/>
                        <label>
                            <p>인증코드</p>
                            <input type="password" name="permitCode" maxLength={20}
                                   onChange={handleChange}
                            />
                            {!valid && <span className={styles.invalid}>인증코드를 입력해주세요.</span>}
                            <FormButton
                                handleReset={handleReset}
                                toggleHandler={toggleHandler}
                                action={"검증"}/>
                        </label>
                    </form>
                )
            }


        </div>
    )
}