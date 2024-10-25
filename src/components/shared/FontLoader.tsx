"use client";

import localFont from "next/font/local";

const geistSans = localFont({
    src: "../../app/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../../app/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function FontLoader({ children }: { children: React.ReactNode }) {
    return (
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {children}
        </body>
    );
}