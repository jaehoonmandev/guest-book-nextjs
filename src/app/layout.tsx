import {Inter} from 'next/font/google'
import React from "react";
import "@fontsource/pacifico";

import './styles/globals.css'
import {Metadata, Viewport} from "next";
import {isMobileDevice} from "@/lib/isMobileDevice";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: '재훈맨 방명록',
    description: '재훈맨의 방명록 사이트',
    authors: { name: '재훈맨', url: 'https://github.com/jaehoonmandev' },
    icons: {
        icon: "public/icon/favicon.ico",
    },

}

// 모바일 환경 사용 시 input focus zoom-in 되지 않게 설정
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,

}

export default function RootLayout({children,}: { children: React.ReactNode }) {

    const isMobile = isMobileDevice();


    return (
        <html
            style={isMobile ? {minWidth: 220} : {minWidth: 630}}
            lang="kr">

        <body className={inter.className}>

        <main className={"container"}

        >
            {children}
        </main>

                {/*modal 띄울 위치*/}
                <div id={"portal"}></div>

            </body>
        </html>
    )
}
