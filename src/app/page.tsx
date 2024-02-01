"use client";

import styles from './styles/page.module.css'
import GuestBook from "@/app/components/guest-book/guestBook";
import React, {useCallback, useEffect, useState} from "react";
import {GuestBook as GuestBookInterface} from '@/app/interfaces/guestBook'
import GuestBookConnectError from "@/app/components/error/guestBookConnectError";

import {GET} from '@/app/api/guest-book/route';

export default function Home() {

    /**
     * TODO : [
     *      1. 모듈화 시키기
     *      2. useEffect 사용 시 여러번 호출되는거 최적화(useCallback 과 같이)
     * ]
     */
    const [guestBooks, setGuestBooks] = useState<GuestBookInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    //useCallback으로 함수 과도한 렌더링을 억제하고 함수를 재사용하여 최적화
    const fetchHandler =
        useCallback(async () => {

            setIsLoading(true);

            try {
                const response =
                    await GET('ASC', 'title'); // GET 함수를 직접 호출

                if (!response.ok) {
                    const {error} = await response.json();
                    throw new Error(error);
                }

                const data = await response.json();
                setGuestBooks(data);
                setIsLoading(false);

            } catch (error: any) {
                setError(error.message);
            }
            setIsLoading(false);

        }, []);

    //렌더링 작업과 관련되지 않은 외부 프로세스를 useEffect를 사용한다.
    useEffect(() => {
        fetchHandler();
    }, [fetchHandler]);

    //TODO : 로딩 기능 추가하기.
    return (
        <>

            <section className={styles.cardSection}>
                {isLoading &&
                        <h1>로딩중</h1>
                }
            {!error && guestBooks.length > 0 && !isLoading
                ? <GuestBook guestBooks={guestBooks}/>
                : <GuestBookConnectError errorMessage={error}/>
            }
            </section>


        </>


    )
}
