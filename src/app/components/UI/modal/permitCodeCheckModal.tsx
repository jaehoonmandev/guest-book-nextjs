import styles from "@/app/components/UI/form/form.module.css";
import {ModalProps} from "@/app/interfaces/modal";

export default function PermitCodeCheckModal({toggleHandler, authorityConfirm}: ModalProps){

    const checkPermitCode = () => {

        if (authorityConfirm) {
            authorityConfirm()
        }
        toggleHandler()
    }
    return (
        <div
            /*toggleHandler가 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.formBox}>
            <h2>인증코드 검증</h2>

            <form className={styles.form} onSubmit={checkPermitCode}>

                <label>
                    <p>인증코드</p>
                    <input type="password" name="permitCode" maxLength={20}
                        /*value={formData.permitCode}
                        onChange={handleChange}*/
                    />
                    {/*{!valid.permitCode && <span className={styles.invalid}>인증코드를 입력해주세요</span>}*/}
                    <button type={"button"} onClick={toggleHandler}>닫기</button>
                    <button type={"submit"} >검증</button>
                </label>

            </form>

        </div>
    )
}