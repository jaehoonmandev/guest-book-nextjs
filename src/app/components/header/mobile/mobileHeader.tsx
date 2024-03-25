import styles from "./mobileHeader.module.css";
import React, {useState} from "react";
import MobileMainTitle from "@/app/components/header/mobile/mobileMainTitle";
import MobileMenuTrigger from "@/app/components/header/mobile/mobileMenuTrigger";
import MobileSearchArea from "@/app/components/header/mobile/mobileSearchArea";
import SearchConditions from "@/app/components/header/mobile/mobileSearchConditions";

export default function MobileHeader() {

    //메뉴를 확장했는지 여부
    const [isExpansion, setIsExpansion] = useState(false);

    const changeHandler = () => {

        setIsExpansion((prevState) => {

            //이전 상태가 확장 상태가 아니라면 즉, 현재 사이드바를 확장하는 중이라면
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


    return (
        <>
            <div className={styles.header}>
                <MobileMainTitle/>
                <MobileMenuTrigger changeHandler={changeHandler}/>
            </div>

            {isExpansion && (
                <MobileSearchArea>
                    <SearchConditions/>
                </MobileSearchArea>
            )}
        </>

    )
}