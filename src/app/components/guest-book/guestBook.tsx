// Cards 컴포넌트
"use client"
import AddGuestBook from "@/app/components/guest-book/addGuestBook";
import styles from './guestBook.module.css';
import AddedGuestBook from "@/app/components/guest-book/addedGuestBook";
import Loading from "@/app/components/UI/loading/loading";
import React, {useEffect, useRef, useState} from "react";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import Config from "../../../../config/config.export";
import GuestBookConnectError from "@/app/components/error/guestBookConnectError";
import MobileHeader from "@/app/components/header/mobile/mobileHeader";
import Header from "@/app/components/header/header";
import SideFunctions from "@/app/components/UI/sideFunctions/sideFunctions";

interface props {
    isMobile : boolean,
}
export default function GuestBook({isMobile} : props) {



    const {
        guestBooks,
        isLoading,

        orderDirection,
        orderField,
        searchWriter,

        //fetchedLength,
        // clearGuestBooks,

        page,
        changePage,

        isEndOfData,
        changeIsEndOfData,

        addOrModFlicker,

        error,
        fetchGuestBooks } = useGuestBookContext();

    const endOfPageRef = useRef<HTMLDivElement>(null);


    // 무한 스크롤 감지 이벤트
    useEffect(() => {
        const handleIntersect: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                // 스크롤이 끝에 도달했을 때
                if (entry.isIntersecting) {
                    //로딩중이 아니고
                    if(!isLoading){
                        // 불러온 방명록 데이터 크기가 현재 있어야할 데이터의 크기와 비교
                        if(guestBooks.length >= ((page + 1) * Config().pageSize)){
                            changePage(page + 1)
                        }else {
                            // 불러온 데이터가 현재 있어야할 데이터의 크기보다 작다면 모든 데이터를 불러온 것.
                            changeIsEndOfData(true);
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            threshold: 1 // 1로 설정하면 엘리먼트가 완전히 화면에 나타났을 때 콜백이 호출.
        });

        // 관찰할 대상을 등록
        if (endOfPageRef.current && !isEndOfData) {
            observer.observe(endOfPageRef.current);
        }

        // 컴포넌트가 언마운트될 때 관찰 해제
        return () => {
            observer.disconnect();
        };
    }, [guestBooks, isEndOfData, isLoading]);

    //페이지 로드 시 바로 데이터를 가져온다.(Default 검색 조건 : DESC, createdTime)
    useEffect(() => {
            if(!isEndOfData){
                fetchGuestBooks(orderDirection,orderField,searchWriter, page);
            }
        },
        //상단 검색 조건이 변결될 때마다 데이터를 가져온다.
        [orderDirection, orderField, searchWriter, page, isEndOfData, addOrModFlicker]);

    // 검색 조건이 변경되면 방명록 데이터 관련 상태를 초기화한다.
    useEffect(() => {
        // 스크롤 위로 올리기
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        // clearGuestBooks();
        changeIsEndOfData(false);
        changePage(0)
    }, [orderDirection, orderField, searchWriter, addOrModFlicker])




    //생성, 수정, 삭제 등 Modal을 띄울 때 사용하는 State
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleHandler = () => {
        if(!isLoading || guestBooks.length > 0){

            setIsModalOpen((prevIsModalOpen) => {
                //이전 상태가 확장 상태가 아니라면 즉, 현재 사이드바를 확장하는 중이라면,
                if(!prevIsModalOpen){
                    // body 스크롤을 방지한다
                    document.body.style.overflow = 'hidden';
                }else {
                    //사이드를 닫는다면 스크롤을 다시 활성화.
                    document.body.style.removeProperty('overflow');
                }
                return !prevIsModalOpen
            });
        }
    }

    return (
        <>
            {/*layout에서 호출하던 header 통합*/}
            <header>
                {isMobile
                    ? (
                        <MobileHeader/>
                    )
                    : (
                        <Header/>
                    )}
            </header>

            <section className={isMobile ? styles.mobileCardSection : styles.cardSection}>

                {error === '' ? (
                    <>
                        {/*로딩은 화면 구성에 맞추기 위하여 GuestBook 안으로 넣었음(div 분리로도 가능은 함..)*/}
                        <div className={styles.box}>


                            <AddGuestBook isModalOpen={isModalOpen} toggleHandler={toggleHandler}/>
                            <AddedGuestBook guestBooks={guestBooks}/>

                            {isLoading && <Loading/>}

                        </div>

                        <div ref={endOfPageRef}/>

                        <SideFunctions isMobile={isMobile} toggleHandler={toggleHandler}/>

                    </>
                ) : (
                    <GuestBookConnectError errorMessage={error}/>
                )}




            </section>

        </>
    );

}
