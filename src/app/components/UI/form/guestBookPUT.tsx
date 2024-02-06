import {FormEvent, useEffect, useState} from "react";
import styles from './form.module.css';
import {PUT} from "@/app/api/guest-book/route";
import {ModalProps, PutFormData} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";



export default function GuestBookPUT(
    {toggleHandler, guestBook, colors} : ModalProps,
    ){

    const {
        orderDirection,
        orderField,
        searchWriter,
        fetchGuestBooks
    } = useGuestBookContext();

    const PutGuestBookInitState : PutFormData  = {
            id: '',
            title: '',
            writer: '',
            contents: '',
            color: '',
    }

    const resetFormData   = {
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
        const { name, value } = e.currentTarget;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleReset = () => {
        setFormData(resetFormData);
    }

    /**
     * TODO : [
     *     1. FormValidation 작성.
     * ]
     * */


    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        try {
            const response = await PUT(formData);

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            console.log('Form submitted successfully');
            // 폼 제출 후 폼 초기화
            toggleHandler();
            fetchGuestBooks(orderDirection,orderField,searchWriter);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    return (
        <div
            /*toggleHandler이 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.formBox}>
            <h2>방명록 작성하기</h2>

            <form onSubmit={handleSubmit}>

                <input type={"hidden"} name={"id"} value={formData.id}/>

                <label>
                    제목:
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    작성자:
                    <input type="text" name="writer" value={formData.writer} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    내용:
                    <textarea name="contents" value={formData.contents} onChange={handleChange}/>
                </label>

                <h4>색상</h4>
                <div className={styles.colorPalette}>
                    {colors.map((color, index) => (
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

                <br/>
                <button onClick={handleReset}>초기화</button>
                <button onClick={toggleHandler}>취소</button>
                <button type="submit">수정</button>
            </form>
        </div>
    )

}
