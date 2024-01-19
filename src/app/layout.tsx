import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import "@fontsource/pacifico";

const inter = Inter({ subsets: ['latin'] })

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
        <div >
          <p className={"headerTitle"}> Guest Book</p>
        </div>

      {children}
      </body>
    </html>
  )
}
