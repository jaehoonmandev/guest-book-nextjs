import {FormEvent, useEffect, useState} from "react";
import styles from './form.module.css';
import {ModalProps} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {PutFormData} from "@/app/interfaces/form";
import {PUT} from "@/app/components/fetch/fetchGuestBook";
import {putValidInterface} from "@/app/interfaces/valid";
import {isBlank} from "@/app/components/utility/formDataValid";
import FormButton from "@/app/components/UI/form/formButton";


export default function GuestBookPUT(
    {toggleHandler, guestBook, colors}: ModalProps,
) {

    const {
        orderDirection,
        orderField,
        searchWriter,
        fetchGuestBooks
    } = useGuestBookContext();

    const PutGuestBookInitState: PutFormData = {
        id: '',
        title: '',
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
     * A component is changing an uncontrolled input to be controlled...의 에러를 회피하기 위한 reset이다...
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

        if (validation()) {
            try {
                const response = await PUT(formData);

                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }

                console.log('Form submitted successfully');
                // 폼 제출 후 폼 초기화
                toggleHandler();
                fetchGuestBooks(orderDirection, orderField, searchWriter);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }

    }


    return (
        <div
            /*toggleHandler이 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.formBox}>
            <h2>방명록 내용 변경</h2>

            <form className={styles.form} onSubmit={handleSubmit}>

                <input type={"hidden"} name={"id"} value={formData.id}/>

                <label>
                    <p>제목</p>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                    {!valid.title && <span className={styles.invalid}>제목을 입력해주세요</span>}
                </label>

                <label>
                    <p>내용</p>
                    <textarea name="contents" maxLength={100} value={formData.contents} onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.contents.length}/100byte</span>
                    {!valid.contents && <span className={styles.invalid}>내용을 입력해주세요</span>}
                </label>

                {/*작성자는 변경 불가능이므로 state로 관리 안하며, 값도 disable, 서버로 넘어가지 않도록 name도 제거 시킨다.*/}
                <label>
                    <p>작성자</p>
                    <input type="text" value={formData.writer} disabled={true}/>
                </label>

                <p>색상</p>
                <div className={styles.colorPalette}>
                    {colors?.map((color, index) => (
                        <input
                            key={index}
                            type="radio"
                            name="color"
                            value={color.value}
                            id={color.color}

                            /*수정 시 선택한 color 값에 해당하는 input check*/
                            checked={formData.color === color.value}

                            style={{background: `${color.value}`}}
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
        </div>
    )

}
