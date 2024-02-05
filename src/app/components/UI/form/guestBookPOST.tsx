import {FormEvent, useState} from "react";
import styles from "@/app/components/UI/modal/guestBookModal.module.css";
import {GET, POST} from "@/app/api/guest-book/route";
import {ModalContextProps, ModalProps, PostFormData, PutFormData} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";



export default function GuestBookPOST( {toggleHandler} : ModalProps,){
    const {
        orderDirection,
        orderField,
        fetchGuestBooks
    } = useGuestBookContext();

    const PostGuestBookInitState : PostFormData = {
                title: '',
                writer: '',
                contents: '',
                permitCode: '',
            }


    const [formData, setFormData] = useState(PostGuestBookInitState);

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.currentTarget;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleReset = () => {
        setFormData(PostGuestBookInitState);
    }

    /**
     * TODO : [
     *     1. FormValidation 작성.
     * ]
     * */



    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        //submit 버튼을 클릭하였을 때만 데이터를 변경한다
        setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value });

        try {
            const response = await POST(formData);

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            console.log('Form submitted successfully');
            //TODO : 폼 제출 후 액션 지정.
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

                <label>
                    제목:
                    <input type="text" name="title" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    작성자:
                    <input type="text" name="writer" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    내용:
                    <textarea name="contents" onChange={handleChange}/>
                </label>
                <br/>

                <label>
                    인증코드 :
                    <input type="password" name="permitCode" onChange={handleChange}/>
                </label>

                <br/>
                <button onClick={handleReset}>초기화</button>
                <button onClick={toggleHandler}>취소</button>
                <button type="submit">등록</button>
            </form>
        </div>
    )

}
