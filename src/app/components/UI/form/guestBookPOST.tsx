import {FormEvent, useState} from "react";
import styles from './form.module.css';
import {POST} from "@/app/api/guest-book/route";
import {ModalProps} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {PostFormData} from "@/app/interfaces/form";


export default function GuestBookPOST({toggleHandler, colors}: ModalProps,) {


    const [error, setError] = useState(false);

    //Context 항목
    const {
        orderDirection,
        orderField,
        searchWriter,
        fetchGuestBooks
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

    // form 값 변경 시 마다 State를 변경시킨다.
    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {name, value} = e.currentTarget;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    //초기화
    const handleReset = () => {
        setFormData(PostGuestBookInitState);
    }

    /**
     * TODO : [
     *     1. FormValidation 작성.
     * ]
     * */


    // form submit 시
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        //페이지 이동을 방지한다.
        event.preventDefault();

        //submit 버튼을 클릭하였을 때만 데이터를 변경한다
        //setFormData({...formData, [event.currentTarget.name]: event.currentTarget.value});

        setError(false);
        try {
            const response = await POST(formData);

            if (!response.ok) {
                const {error} = await response.json();
                throw new Error(error);
            }
            //const {result} = await response.json();

            // TODO :  제출 후 새로운 데이터 호출 시 fetchGuestBooks 하면 화면 전체 렌더링 되는거 때문에 결과를 못 불러온다.

            //toggleHandler(); // Modal 창을 비활성화한다.
            fetchGuestBooks(orderDirection, orderField, searchWriter); // 수정된 데이터를 가져온다.

        } catch (error: any) {
            setError(true);
        }
    }


    return (
        <div
            /*toggleHandler이 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.formBox}>
            <h2>방명록 등록</h2>

            {error && <h2>{error}</h2> }

            <form onSubmit={handleSubmit}>

                <label>
                    <h4>제목</h4>

                    <input type="text" name="title" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    <h4>작성자</h4>

                    <input type="text" name="writer" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    <h4>내용</h4>

                    <textarea name="contents" onChange={handleChange}/>
                </label>
                <br/>

                <label>
                    <h4>인증코드</h4>
                    <input type="password" name="permitCode" onChange={handleChange}/>
                </label>

                <h4>색상</h4>
                <div className={styles.colorPalette}>
                    {colors.map((color, index) => (
                        /*<div key={index} style={{background:`${color.value}`}}>
                            <input
                                type="radio"
                                name="color"
                                value={color.value}
                                id={color.color}
                                onChange={handleChange}
                            />
                            {/!*<label htmlFor={color.color} className={styles[color]}></label>*!/}
                        </div>*/
                        <input
                            key={index}
                            type="radio"
                            name="color"
                            value={color.value}
                            id={color.color}
                            style={{background:`${color.value}`}}
                            onChange={handleChange}
                        />
                    ))}
                </div>

                <br/>
                <button onClick={handleReset}>초기화</button>
                <button onClick={toggleHandler}>취소</button>
                <button type="submit">등록</button>
            </form>
        </div>
    )

}
