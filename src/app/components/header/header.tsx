import MainTitle from "@/app/components/header/mainTitle";
import SearchArea from "@/app/components/header/searchArea";
import SearchConditions from "@/app/components/header/searchConditions";
import SearchBar from "@/app/components/header/searchBar";
import React from "react";
import {useGuestBookContext} from "@/app/store/guestBook-context";
import MobileHeader from "@/app/components/header/mobile/mobileHeader";

export default function Header() {


    const {isMobile} =useGuestBookContext();

    return (

        isMobile
            ? (
                <MobileHeader/>
            )
            : (
                <div>
                    <MainTitle></MainTitle>


                    {/*Header의 Search condition에 따른 GET 요청이 가능하도록 */}

                    <SearchArea>
                        <SearchConditions></SearchConditions>
                        <SearchBar></SearchBar>
                    </SearchArea>

                </div>
            )




)
}