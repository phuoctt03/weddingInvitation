import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond, Dancing_Script } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "Wedding Invitation | Daisuke & Rinka",
  description: "Join us in celebrating the wedding of Daisuke & Rinka",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <head>
        <link rel="icon" href="/icon/sakura.png" sizes="any" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#fffaf5",
          fontFamily: inter.style.fontFamily,
        }}
      >
        {children}
      </body>
    </html>
  )
}

