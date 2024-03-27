import styles from "./mobileHeader.module.css";
import React, {useEffect, useState} from "react";
import MobileMainTitle from "@/app/components/header/mobile/mobileMainTitle";
import MobileMenuTrigger from "@/app/components/header/mobile/mobileMenuTrigger";
import MobileSearchConditions from "@/app/components/header/mobile/mobileSearchConditions";
import MobileSearchBar from "@/app/components/header/mobile/mobileSearchBar";

export default function MobileHeader() {

    //메뉴를 확장했는지 여부
    const [isExpansion, setIsExpansion] = useState(false);

    const changeHandler = () => {

        setIsExpansion((prevState) => {

            // //이전 상태가 확장 상태가 아니라면 즉, 현재 사이드바를 확장하는 중이라면
            if(!prevState){
                // body 스크롤을 방지한다
                document.body.style.overflow = 'hidden';
            }else {
                //사이드를 닫는다면 스크롤을 다시 솰성 시킨다.
                document.body.style.removeProperty('overflow');
            }


            return !prevState
        });
    }

    useEffect(() => {
        const hideHeader = () => {
            setIsExpansion(false);
        }
        window.addEventListener("scroll", hideHeader)
        return () => {
            window.removeEventListener("scroll", hideHeader)
        }
    }, [])


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