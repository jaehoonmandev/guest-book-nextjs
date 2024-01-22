import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import "@fontsource/pacifico";

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
        <div className={"header"}>

            <div className={"title"}>
                <p> Guest Book</p>
            </div>

            <div className={"menu"}>
                <div>
                    <span>Sort By</span>
                </div>

                <div>
                    <ul>
                        <li>Date</li>
                        <li>Title</li>
                        <li>Writer</li>
                        <li className={"toggle"}>
                            <label>
                                <span>DES</span>
                                <input id="order_by" role="switch" type="checkbox"/>
                                <span>AES</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className={"searchBar"}>
                    <label>
                        <input role="search" type="text" placeholder="Search as Writer" />
                        <button></button>
                    </label>
                </div>

            </div>

        </div>


        {children}
        </body>
        </html>
    )
}
