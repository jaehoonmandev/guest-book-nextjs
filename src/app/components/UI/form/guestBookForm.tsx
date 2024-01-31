import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import styles from "@/app/components/UI/modal/guestBookModal.module.css";
import {ModalProps, ModalContents} from '@/app/interfaces/guestBook'



export default function GuestBookForm( {toggleHandler, guestBookData, type} : ModalProps,){


    const GuestBookInitState = {
        id:'',
        title: '',
        writer: '',
        contents: '',
        permitCode: '',
    }




    const [formData, setFormData] = useState(GuestBookInitState);

    useEffect(() => {
        if (guestBookData) {
            setFormData({
                id: guestBookData.id || "",
                title: guestBookData.title || "",
                writer: guestBookData.writer || "",
                contents: guestBookData.contents || "",
                permitCode: ""
            });
        }
    }, [guestBookData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleReset = () => {
        setFormData(GuestBookInitState);
    }

    /**
     * TODO : [
     *     1. FormValidation 작성.
     * ]
     * */

    let contents: ModalContents =
        type === 'add'
            ?
                {
                    permitCode : (
                    <label>
                        인증코드 :
                        <input type="password" name="permitCode" onChange={handleChange}/>
                    </label>
                    ),
                    id : null,
                    submitButtonType: "등록",
                    httpMethod: "POST"
                }
            :
                {
                    permitCode: null,
                    id : (
                        <input type={"hidden"} name={"id"} value={formData.id}/>
                    ),
                    submitButtonType: "수정",
                    httpMethod: "PUT"
                }



    /*if(type === "add"){
        contents.permitCode =(
            <label>
                인증코드 :
                <input type="password" name="permitCode" onChange={handleChange}/>
            </label>
        )
        contents.submitButtonType = "등록"
        contents.httpMethod = "POST"
    }*/

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        try {
            const response = await fetch('/api/guest-book', {
                method: contents.httpMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            console.log('Form submitted successfully');
            // 폼 제출 후 폼 초기화
            //setFormData(GuestBookInitState);
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
                    <input type="text" name="contents" value={formData.contents} onChange={handleChange}/>
                </label>
                <br/>

                {contents.id}
                {contents.permitCode}

                <br/>
                <button onClick={handleReset}>초기화</button>
                <button onClick={toggleHandler}>취소</button>
                <button type="submit">{contents.submitButtonType}</button>
            </form>
        </div>
    )

}
