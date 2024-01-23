import MainTitle from "@/app/components/header/mainTitle";
import SearchArea from "@/app/components/header/searchArea";
import SearchConditions from "@/app/components/header/searchConditions";
import SearchBar from "@/app/components/header/searchBar";
import React from "react";

export default function Header() {
    return (
        <div>
            <MainTitle></MainTitle>

            <SearchArea>
                <SearchConditions></SearchConditions>
                <SearchBar></SearchBar>
            </SearchArea>
        </div>

    )
}