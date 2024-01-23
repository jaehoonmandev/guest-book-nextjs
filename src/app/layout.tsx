import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import "@fontsource/pacifico";

import './styles/globals.css'
import SearchConditions from "@/app/components/header/searchConditions";
import SearchBar from "@/app/components/header/searchBar";
import {Main} from "next/document";
import MainTitle from "@/app/components/header/mainTitle";
import SearchArea from "@/app/components/header/searchArea";
import Header from "@/app/components/header/header";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Guest Book',
    description: '게스트북 토이프로젝트',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="kr">
        <body className={inter.className}>

        <main className={"container"}>
            <header>
                <Header/>
            </header>


                {children}


        </main>
        </body>
        </html>
    )
}
