import {FormEvent, useEffect, useState} from "react";
import styles from './form.module.css';
import {ModalProps} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {PutFormData} from "@/app/interfaces/form";
import {PUT} from "@/app/components/fetch/fetchGuestBook";
import {putValidInterface} from "@/app/interfaces/valid";
import {isBlank} from "@/app/components/utility/formDataValid";


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
        writer: '',
        contents: '',
        color: '',
    }

    const resetFormData = {
        title: '',
        writer: '',
        contents: '',
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

    const handleReset = () => {
        setFormData(resetFormData);
    }

    /*데이터 검증*/
    const putInvalidObject: putValidInterface = {
        title: true,
        contents: true,
        writer: true,
        color: true,
    }
    const [valid, setValid] = useState(putInvalidObject)

    //submit 시 최종적으로 사용자가 입력한 데이터를 검증한다.
    const validation = () => {

        const enteredTitleValid = !isBlank(formData.title);
        const enteredContentsValid = !isBlank(formData.contents);
        const enteredWriterValid = !isBlank(formData.writer);
        const enteredColorValid = !isBlank(formData.color);

        setValid(
            {
                title: enteredTitleValid,
                contents: enteredContentsValid,
                writer: enteredWriterValid,
                color: enteredColorValid,
            }
        );

        return enteredTitleValid &&
            enteredContentsValid &&
            enteredWriterValid &&
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
            <h2>방명록 작성하기</h2>

            <form className={styles.form} onSubmit={handleSubmit}>

                <input type={"hidden"} name={"id"} value={formData.id}/>

                <label>
                    제목:
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                    {!valid.title && <span>제목을 입력해주세요</span>}
                </label>

                <label>
                    내용:
                    <textarea name="contents" maxLength={100} value={formData.contents} onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.contents.length}/100byte</span>
                    {!valid.contents && <span>내용을 입력해주세요</span>}
                </label>

                <label>
                    작성자:
                    <input type="text" name="writer" value={formData.writer} onChange={handleChange}/>
                    {!valid.writer && <span>제목을 입력해주세요</span>}
                </label>

                <h4>색상</h4>
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
                    {!valid.color && <span>색상을 선택해주세요</span>}
                </div>
                <div>
                    <button type={"button"} onClick={handleReset}>초기화</button>
                    <button type={"button"} onClick={toggleHandler}>취소</button>
                    <button type={"submit"}>변경</button>
                </div>
            </form>
        </div>
    )

}
