import {Inter} from 'next/font/google'
import React from "react";
import "@fontsource/pacifico";

import './styles/globals.css'

const inter = Inter({subsets: ['latin']})

/*export const metadata: Metadata = {
    title: 'Guest Book',
    description: '게스트북 토이프로젝트',
}*/

export default function RootLayout({children,}: { children: React.ReactNode }) {

    return (
        <html lang="kr">

        <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"/>

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
