import styles from "@/app/components/UI/form/form.module.css";
import {PermitCodeCheckProps} from "@/app/interfaces/modal";
import {FormEvent, useState} from "react";
import {CheckPermitCode} from "@/app/guestBookAPI/OtherAction";
import {GET} from "@/app/guestBookAPI/APIComponent";
import {GuestBook} from "@/app/interfaces/guestBook";

export default function PermitCodeCheckModal({toggleHandler, authorityConfirm, guestBookId}: PermitCodeCheckProps) {

    const [permitCode, setPermitCode] = useState("")

    const handleChange = (event : FormEvent<HTMLInputElement>) => {
        setPermitCode(event.currentTarget.value);
    }
    async function checkPermitCode(event : FormEvent){
        event.preventDefault();


        try {
            const response = await CheckPermitCode(guestBookId,permitCode);

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const result = await response.json();

            if (result.result){
                console.log("트루트루")
                // authorityConfirm && authorityConfirm()
                // toggleHandler()
            }else {
                console.log("뻐큐뻐큐")
            }

        } catch (error: any) {

           // setError(error.message);
        }

    }
    return (
        <div
            /*toggleHandler가 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.formBox}>
            <h2>인증코드 검증</h2>

            <form className={styles.form} onSubmit={checkPermitCode}>
                <input type={"hidden"} name={"id"} value={guestBookId}/>
                <label>
                    <p>인증코드</p>
                    <input type="password" name="permitCode" maxLength={20}
                           onChange={handleChange}
                    />
                    {/*{!valid.permitCode && <span className={styles.invalid}>인증코드를 입력해주세요</span>}*/}
                    <button type={"button"} onClick={toggleHandler}>닫기</button>
                    <button type={"submit"}>검증</button>
                </label>

            </form>

        </div>
    )
}