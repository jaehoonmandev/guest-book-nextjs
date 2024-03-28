import styles from "@/app/components/UI/form/form.module.css";
import {ButtonProps} from "@/app/interfaces/Iform";


export default function FormButton({handleReset, toggleHandler, action}:ButtonProps) {
    return (
        <div className={styles.buttonDiv}>
            <button className={styles.resetBtn} type={"button"} onClick={handleReset}>초기화</button>
            <div>
                <button className={styles.cancelBtn} type={"button"} onClick={toggleHandler}>취소</button>
                <button className={styles.submitBtn} type={"submit"}>{action}</button>
            </div>
        </div>
    )
}