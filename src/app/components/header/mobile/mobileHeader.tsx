import styles from "./mobileHeader.module.css";
import React, {useEffect, useState} from "react";
import MobileMainTitle from "@/app/components/header/mobile/mobileMainTitle";
import MobileMenuTrigger from "@/app/components/header/mobile/mobileMenuTrigger";
import MobileSearchConditions from "@/app/components/header/mobile/mobileSearchConditions";
import MobileSearchBar from "@/app/components/header/mobile/mobileSearchBar";
import {useGuestBookContext} from "@/app/store/guestBook-context";

export default function MobileHeader() {

    const{orderField, orderDirection, searchWriter} = useGuestBookContext()

    //메뉴를 확장했는지 여부
    const [isExpansion, setIsExpansion] = useState(false);

    const changeHandler = () => {

        setIsExpansion((prevState) => {

            // //이전 상태가 확장 상태가 아니라면 즉, 현재 사이드바를 확장하는 중이라면
            // if(!prevState){
            //     // body 스크롤을 방지한다
            //     document.body.style.overflow = 'hidden';
            // }else {
            //     //사이드를 닫는다면 스크롤을 다시 솰성 시킨다.
            //     document.body.style.removeProperty('overflow');
            // }


            return !prevState
        });
    }

    //조건 변경 시 메뉴 넣어놓기
    useEffect(() => {
        // setIsExpansion((prevState) => {
        //     // 사이드 메뉴가 확장된 상태라면
        //     if(prevState){
        //         return false; // 넣어주고
        //     }else {
        //         return prevState //아니라면 유지
        //     }
        // });
        setIsExpansion(false);
    }, [orderField, orderDirection, searchWriter]);

    // 스크롤 시 메뉴 닫기인데...
    // 작성자로 검색할 때 스크롤 돼서 닫힌다. 고로 비활성화
    // useEffect(() => {
    //     const hideHeader = () => {
    //         setIsExpansion(false);
    //     }
    //     window.addEventListener("scroll", hideHeader)
    //     return () => {
    //         window.removeEventListener("scroll", hideHeader)
    //     }
    // }, [])


    return (
        <>
            <div className={styles.header}>
                <MobileMainTitle/>
                <MobileMenuTrigger isExpansion={isExpansion} changeHandler={changeHandler}/>
            </div>
            <div className={`${styles.searchArea} ${isExpansion ? styles.active : ''}`}>
                <MobileSearchConditions/>
                <MobileSearchBar/>
            </div>
        </>

    )
}