"use client";

import styles from './styles/page.module.css'
import GuestBook from "@/app/components/guest-book/guestBook";
import React, {useEffect, useRef, useState} from "react";

import GuestBookConnectError from "@/app/components/error/guestBookConnectError";

import {useGuestBookContext} from "@/app/store/guestBook-context";
import {pageSize} from "@/app/components/common/globalVar";
import Loading from "@/app/components/UI/loading/loading";

export default function Home() {


    const {
        guestBooks,
        isLoading,

        orderDirection,
        orderField,
        searchWriter,

        //fetchedLength,
        clearGuestBooks,

        error,
        fetchGuestBooks } = useGuestBookContext();

    const endOfPageRef = useRef<HTMLDivElement>(null);

    const [page, setPage] = useState(0)
    const [isEndOfData, setIsEndOfData] = useState(false);

    useEffect(() => {
        const handleIntersect: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                // 스크롤이 끝에 도달했을 때
                if (entry.isIntersecting) {

                    if(!isLoading ){
                        if((guestBooks.length >= (page + 1) * pageSize)){
                            console.log("불러오기")
                            setPage(prevState => prevState + 1)
                        }else {
                            console.log("그만 불러오기")
                            setIsEndOfData(true);
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            threshold: 1 // 1로 설정하면 엘리먼트가 완전히 화면에 나타났을 때 콜백이 호출됩니다.
        });

        // 관찰할 대상을 등록
        if (endOfPageRef.current && !isEndOfData) {
            observer.observe(endOfPageRef.current);
        }

        // 컴포넌트가 언마운트될 때 관찰 해제
        return () => {
            observer.disconnect();
        };
    }, [guestBooks,isEndOfData, isLoading]);

    //페이지 로드 시 바로 데이터를 가져온다.(Default 검색 조건 : DESC, createdTime)
    useEffect(() => {
            if(!isEndOfData){
                fetchGuestBooks(orderDirection,orderField,searchWriter, page);
            }
        },
        //상단 검색 조건이 변결될 때마다 데이터를 가져온다.
        [orderDirection, orderField, searchWriter, page, isEndOfData]);

    useEffect(() => {
        clearGuestBooks();
        setPage(0);
        setIsEndOfData(false);
    }, [orderDirection, orderField, searchWriter])

    return (
        <>
            <section className={styles.cardSection}>
                {error === '' ? (
                    <>
                        {/*로딩은 화면 구성에 맞추기 위하여 GuestBook 안으로 넣었음(div 분리로도 가능은 함..)*/}
                        <GuestBook isLoading={isLoading} guestBooks={guestBooks}/>
                        <div ref={endOfPageRef}/>
                    </>
                ) : (
                    <GuestBookConnectError errorMessage={error}/>
                )}

            </section>

        </>
    );
};

