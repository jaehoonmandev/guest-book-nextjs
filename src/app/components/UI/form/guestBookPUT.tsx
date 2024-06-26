import {FormEvent, useEffect, useState} from "react";
import styles from './form.module.css';
import {PutModalProps} from "@/app/interfaces/Imodal";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {PutFormData} from "@/app/interfaces/Iform";
import {PUT} from "@/app/guestBookAPI/APIComponent";
import {putValidInterface} from "@/app/interfaces/Ivalid";
import {BadWordFilter, isBlank} from "@/app/utility/formDataValid";
import FormButton from "@/app/components/UI/form/formButton";
import MakeDelay from "@/app/utility/makeDelay";


export default function GuestBookPUT({toggleHandler, guestBook, colors, changeLoadingState,changeRequestResult,changeErrorMsg}: PutModalProps,
) {

    const {
        changeAddOrModFlicker,
    } = useGuestBookContext();

    const PutGuestBookInitState: PutFormData = {
        id: '',
        title: '',
        permitCode:'',
        contents: '',
        writer: '',
        color: '',
    }

    const [formData, setFormData] = useState(PutGuestBookInitState);

    //component 로드 시 props로 방명록 데이터가 넘어왔다면 해당 값 설정
    useEffect(() => {

        if (guestBook) {
            setFormData({
                id: guestBook.id || "",
                title: guestBook.title || "",
                writer: guestBook.writer || "",
                permitCode: guestBook.permitCode || "",
                contents: guestBook.contents || "",
                color: guestBook.color || "",
            });
        }
    }, [guestBook]);

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    /**
     * id값과 작성자 값은 보존하고 싶고, useRef 없이 reset을 구현할 때
     * A component is changing an uncontrolled input to be controlled...의 에러를 회피하기 위한
     */
    const handleReset = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            title: '',
            contents: '',
            color: ''
        }));
    }

    /*데이터 검증*/
    const putInvalidObject: putValidInterface = {
        title: true,
        contents: true,
        color: true,
    }
    const [valid, setValid] = useState(putInvalidObject)

    //submit 시 최종적으로 사용자가 입력한 데이터를 검증한다.
    const validation = () => {

        // 나쁜말 치환하기
        formData.title = BadWordFilter(formData.title);
        formData.contents = BadWordFilter(formData.contents);

        const enteredTitleValid = !isBlank(formData.title);
        const enteredContentsValid = !isBlank(formData.contents);
        const enteredColorValid = !isBlank(formData.color);

        setValid(
            {
                title: enteredTitleValid,
                contents: enteredContentsValid,
                color: enteredColorValid,
            }
        );

        return enteredTitleValid &&
            enteredContentsValid &&
            enteredColorValid
    }


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        changeErrorMsg("");
        if (validation()) {

            changeLoadingState(true);

            try {
                const response = await PUT(formData);

                if (!response.ok) {
                    const {error} = await response.json();
                    throw new Error(error);
                }

                const result = await response.json();

                await MakeDelay();

                if (result.result) {

                    changeRequestResult(true)

                    //딜레이
                    await MakeDelay();

                    // 성공적으로 폼 제출 후 모달 닫기
                    toggleHandler();
                    //POST, PUT 시에는 fetch해서 새로운 데이터 가져오지 말고 그냥 배열에다가 추가 할 수 있지만 최신 데이터 가져오기
                    changeAddOrModFlicker();
                } else {
                    // setPermitResult({
                    //     message: "다시 시도하세요",
                    //     result: false
                    // });

                }
            } catch (error : any) {
                changeErrorMsg(error.message);
            }
        }

        changeRequestResult(false); //인증 코드 검증은 authority 상태 값에 따라 렌더링이 달라지기에 초기화 값으로 되돌리기.
        changeLoadingState(false);

    }

    const maxLength = 15

    return (
        <>
            <h2>방명록 내용 변경</h2>

            <form className={styles.form} onSubmit={handleSubmit}>

                <input type={"hidden"} name={"id"} value={formData.id}/>
                <input type={"hidden"} name={"permitCode"} value={formData.permitCode}/>

                <label>
                    <p>제목</p>
                    <input type="text" name="title" maxLength={maxLength} value={formData.title}
                           onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.title.length}/{maxLength}byte</span>
                    {!valid.title && <span className={styles.invalid}>제목을 입력해주세요</span>}
                </label>

                <label>
                    <p>내용</p>
                    <textarea name="contents" maxLength={300} value={formData.contents} onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.contents.length}/300byte</span>
                    {!valid.contents && <span className={styles.invalid}>내용을 입력해주세요</span>}
                </label>

                {/*작성자는 변경 불가능이므로 state로 관리 안하며, 값도 disable, 서버로 넘어가지 않도록 name도 제거 시킨다.*/}
                <label>
                    <p>작성자</p>
                    <input type="text" maxLength={maxLength} value={formData.writer} disabled={true}/>
                    <span className={styles.contentsSize}>-</span>
                </label>

                <p>색상</p>
                <div className={styles.colorPalette}>
                    {colors?.map((color, index) => (
                        <input
                            key={index}
                            type="radio"
                            name="color"
                            value={color}
                            id={color}
                            /*수정 시 선택한 color 값에 해당하는 input check*/
                            checked={formData.color === color}
                            // style={{background: `${color.value}`}}
                            style={{background: `var(--${color})`}}
                            onChange={handleChange}
                        />
                    ))}
                </div>
                {!valid.color && <span className={styles.invalid}>색상을 선택해주세요</span>}

                <FormButton
                    handleReset={handleReset}
                    toggleHandler={toggleHandler}
                    action={"변경"}/>
            </form>
        </>
    )

}
