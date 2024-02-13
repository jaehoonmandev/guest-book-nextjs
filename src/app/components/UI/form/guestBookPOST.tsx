import {FormEvent, useState} from "react";
import styles from './form.module.css';
import {POST} from "@/app/components/fetch/fetchGuestBook";
import {ModalProps} from "@/app/interfaces/modal";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import {PostFormData} from "@/app/interfaces/form";
import {isBlank} from "@/app/components/utility/formDataValid";
import {postValidInterface, putValidInterface} from "@/app/interfaces/valid";


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

        // 상태를 & 로 하여 모든 항목이 true 일 때만 데이터를 fetch한다.
        if(validation()){
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

    }


    return (
        <div
            /*toggleHandler가 form(자식) div에 전파 안되게 방지*/
            onClick={(e) => e.stopPropagation()}
            className={styles.formBox}>
            <h2>방명록 등록</h2>

            {error && <h2>{error}</h2> }

            <form className={styles.form} onSubmit={handleSubmit}>

                <label>
                    <p>제목</p>
                    <input type="text" name="title" maxLength={20}  value={formData.title} onChange={handleChange}/>
                    {!valid.title && <span>제목을 입력해주세요</span>}
                </label>

                <label>
                    <p>내용</p>

                    <textarea name="contents" maxLength={100} value={formData.contents} onChange={handleChange}/>
                    <span className={styles.contentsSize}>{formData.contents.length}/100byte</span>
                    {!valid.contents && <span>내용을 입력해주세요</span>}
                </label>

                <label>
                    <p>작성자</p>

                    <input type="text" name="writer" maxLength={20} value={formData.writer} onChange={handleChange}/>
                    {!valid.writer && <span>제목을 입력해주세요</span>}
                </label>

                <label>
                    <p>인증코드</p>
                    <input type="password" name="permitCode"maxLength={20} value={formData.permitCode} onChange={handleChange}/>
                    {!valid.permitCode && <span>인증코드를 입력해주세요</span>}

                </label>

                <p>색상</p>
                <div className={styles.colorPalette}>
                    {colors?.map((color, index) => (
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
                    <button type={"submit"}>등록</button>
                </div>
            </form>

        </div>
    )

}
