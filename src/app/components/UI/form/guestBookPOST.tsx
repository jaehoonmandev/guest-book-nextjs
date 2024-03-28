import {FormEvent, useState} from "react";
import styles from './form.module.css';
import {POST} from "@/app/guestBookAPI/APIComponent";
import {PostModalProps} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {PostFormData} from "@/app/interfaces/form";
import {BadWordFilter, isBlank} from "@/app/utility/formDataValid";
import {postValidInterface} from "@/app/interfaces/valid";
import FormButton from "@/app/components/UI/form/formButton";
import MakeDelay from "@/app/utility/makeDelay";


export default function GuestBookPOST({toggleHandler, colors,changeLoadingState, changeRequestResult, changeErrorMsg}: PostModalProps,) {



    //Context 항목
    const {
        changeAddOrModFlicker,
    } = useGuestBookContext();

    //초기화 상태
    const PostGuestBookInitState: PostFormData = {
        title: '',
        writer: '',
        contents: '',
        permitCode: '',
        color : ''
    }

    const [formData, setFormData] = useState(PostGuestBookInitState);

    // form 값 변경 시 마다 해당하는 필드의 state 값을 변경시킨다.
    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        let {name, value} = e.currentTarget;

        //인증 코드 공백 제거.
        if(name === "permitCode"){
            value = value.replaceAll(' ', '');
        }

        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    //초기화
    const handleReset = () => {
        setFormData(PostGuestBookInitState);
    }

    /*데이터 검증*/
    const putInvalidObject : postValidInterface = {
        title : true,
        contents : true,
        writer : true,
        permitCode: true,
        color: true,
    }
    const [valid, setValid] = useState(putInvalidObject)

    //submit 시 최종적으로 사용자가 입력한 데이터를 검증한다.
    const validation = () => {

        // 나쁜말 치환하기
        formData.title = BadWordFilter(formData.title);
        formData.contents = BadWordFilter(formData.contents);
        formData.writer = BadWordFilter(formData.writer);

        const enteredTitleValid = !isBlank(formData.title);
        const enteredContentsValid = !isBlank(formData.contents);
        const enteredWriterValid = !isBlank(formData.writer);
        const enteredPermitCodeValid = !isBlank(formData.permitCode);
        const enteredColorValid = !isBlank(formData.color);


        setValid(
            {
                title: enteredTitleValid,
                contents: enteredContentsValid,
                writer: enteredWriterValid,
                permitCode: enteredPermitCodeValid,
                color: enteredColorValid,
            }
        );

        return enteredTitleValid &&
            enteredContentsValid &&
            enteredWriterValid &&
            enteredPermitCodeValid &&
            enteredColorValid


    }

    // form submit 시
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        //form submit 시 페이지 이동을 방지한다.
        event.preventDefault();

        changeErrorMsg("");

        // 상태를 & 로 하여 모든 항목이 true 일 때만 데이터를 fetch한다.
        if(validation()){


            changeLoadingState(true);

            try {
                const response = await POST(formData);

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
                    const {error} = await response.json();
                    throw new Error(error);
                }

            } catch (error: any) {
                changeErrorMsg(error.message);
            }
        }
        changeRequestResult(false); //인증 코드 검증은 authority 상태 값에 따라 렌더링이 달라지기에 초기화 값으로 되돌리기.
        changeLoadingState(false);

    }

    const maxLength = 15

    return (
        <>
            <h2>방명록 작성</h2>

            <form className={styles.form} onSubmit={handleSubmit}>

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

                <label>
                    <p>작성자</p>
                    <input type="text" name="writer" maxLength={maxLength} value={formData.writer}
                           onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.writer.length}/{maxLength}byte</span>
                    {!valid.writer && <span className={styles.invalid}>작성자를 입력해주세요</span>}
                </label>

                <label>
                    <p>인증코드</p>
                    <input type="password" name="permitCode" maxLength={maxLength} value={formData.permitCode}
                           onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.permitCode.length}/{maxLength}byte</span>
                    {!valid.permitCode && <span className={styles.invalid}>인증코드를 입력해주세요</span>}

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
                    action={"등록"}/>
            </form>
        </>
    )

}
