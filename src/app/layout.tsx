import {Inter} from 'next/font/google'
import React from "react";
import "@fontsource/pacifico";

import './styles/globals.css'
import Head from "next/head";
import {Metadata, Viewport} from "next";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: '재훈맨 방명록',
    description: '방명록 프로젝트',
}

// 모바일 환경 사용 시 input focus zoom-in 되지 않게 설정
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

export default function RootLayout({children,}: { children: React.ReactNode }) {

    return (
        <html lang="kr">

        <body className={inter.className}>

        <main className={"container"}>
            {children}
        </main>

                {/*modal 띄울 위치*/}
                <div id={"portal"}></div>

            </body>
        </html>
    )
}
