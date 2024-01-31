"use client";

import styles from './styles/page.module.css'
import GuestBook from "@/app/components/guest-book/guestBook";
import React, {useCallback, useEffect, useState} from "react";
import {GuestBook as GuestBookInterface} from '@/app/interfaces/guestBook'
import GuestBookConnectError from "@/app/components/error/guestBookConnectError";

export default function Home() {

    /**
     * TODO : [
     *      1. 모듈화 시키기
     *      2. useEffect 사용 시 여러번 호출되는거 최적화(useCallback 과 같이)
     * ]
     */
    const [guestBooks , setGuestBooks] = useState<GuestBookInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //useCallback으로 함수 과도한 렌더링을 억제하고 함수를 재사용하여 최적화
    const fetchHandler =
        useCallback(async () => {

            setIsLoading(true);
            setError(null);

            /*try{
                const response = await fetch('/api/guest-book',
                    {
                        method: 'GET',
                    }).catch((error) => console.log(error));

                //console.log(response.json())

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: [] = await response.json();
                setGuestBooks(data);
                setIsLoading(false);
            }catch (error: any){
                console.error('Error during fetch:', error);
                setError(error.message);
            }*/


            fetch('/api/guest-book',
                {
                    method: 'GET',
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('데이터를 불러올 수 없습니다.');
                    }
                    return response.json()
                })
                .then((data) => {
                    setGuestBooks(data)
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error.message)
                    setError(error.message);
                })

        }, []);

    //렌더링 작업과 관련되지 않은 외부 프로세스를 useEffect를 사용한다.
    useEffect(() => {
        fetchHandler();
    }, [fetchHandler]);

    return (
        <>


        {!error && guestBooks.length >0
        ? (
            <section className={styles.cardSection}>
                <GuestBook guestBooks={guestBooks}/>
            </section>)
        : (
            <section className={styles.errorSection}>
                <GuestBookConnectError/>
            </section>

        )
        }
        </>



)
}
