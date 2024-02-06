"use client";

import styles from './styles/page.module.css'
import GuestBook from "@/app/components/guest-book/guestBook";
import React, {useEffect} from "react";

import GuestBookConnectError from "@/app/components/error/guestBookConnectError";

import {useGuestBookContext} from "@/app/store/guestBook-context";
import Loading from "@/app/components/UI/loading/loading";

export default function Home() {


    const {
        guestBooks,
        isLoading,

        orderDirection,
        orderField,
        searchWriter,

        error,
        fetchGuestBooks } = useGuestBookContext();

    //페이지 로드 시 바로 데이터를 가져온다.(Default 검색 조건 : DESC, createdTime)
    useEffect(() => {
        fetchGuestBooks(orderDirection,orderField,searchWriter);
    },
        //상단 검색 조건이 변결될 때마다 데이터를 가져온다.
        [orderDirection, orderField]);

    //TODO : 로딩 기능 수정하기.

    return (
        <>
            <section className={styles.cardSection}>
                {isLoading && <Loading/>}

                {!error && !isLoading ? (
                    <GuestBook guestBooks={guestBooks} />
                ) : (
                    <GuestBookConnectError errorMessage={error} />
                )}
            </section>
        </>
    );
};

