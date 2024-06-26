import React from "react";
import "@fontsource/pacifico";

import './styles/globals.css'
import {Metadata, Viewport} from "next";
import {isMobileDevice} from "@/lib/isMobileDevice";


import localFont from 'next/font/local'

const pretendard = localFont({
    src: '../../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
})

export const metadata: Metadata = {
    title: '재훈맨 방명록',
    description: '재훈맨의 방명록 사이트',
    authors: { name: '재훈맨', url: 'https://github.com/jaehoonmandev' },
    icons: {
        icon: "public/icon/favicon.ico",
    },

    metadataBase: new URL('https://guestbook.jaehoonman.site/'),
    // openGraph: {
    //     images: '/og-image.png',
    // },

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

        <body className={pretendard.className}>

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
