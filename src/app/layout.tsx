"use client"

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import "@fontsource/pacifico";

import './styles/globals.css'

import Header from "@/app/components/header/header";
import {GuestBookProvider} from "@/app/store/guestBook-provider";

const inter = Inter({subsets: ['latin']})

/*export const metadata: Metadata = {
    title: 'Guest Book',
    description: '게스트북 토이프로젝트',
}*/

export default function RootLayout(
    {children,}: { children: React.ReactNode }
) {
    return (
        <html lang="kr">
        <body className={inter.className}>


        <main className={"container"}>
            <GuestBookProvider>
                <header>
                    <Header/>
                </header>
                {children}
            </GuestBookProvider>
        </main>

        {/*modal 띄울 위치*/}
        <div id={"portal"}></div>

        </body>
        </html>
    )
}
