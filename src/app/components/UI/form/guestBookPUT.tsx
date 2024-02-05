import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import styles from "@/app/components/UI/modal/guestBookModal.module.css";
import {GET, POST, PUT} from "@/app/api/guest-book/route";
import {ModalProps, PutFormData} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";



export default function GuestBookPUT(
    {toggleHandler, guestBook} : ModalProps,
    ){

    const {
        orderDirection,
        orderField,
        fetchGuestBooks
    } = useGuestBookContext();

    const PutGuestBookInitState : PutFormData  = {
            id: '',
            title: '',
            writer: '',
            contents: '',
    }

    const resetFormData   = {
        title: '',
        writer: '',
        contents: '',
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
            fetchGuestBooks(orderDirection,orderField);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    return (
        <div
            /*toggleHandler이 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.modalBox}>
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
                <br/>

                <br/>
                <button onClick={handleReset}>초기화</button>
                <button onClick={toggleHandler}>취소</button>
                <button type="submit">수정</button>
            </form>
        </div>
    )

}
