"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { ToastProvider } from "@/components/ui/ToastProvider";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body >
          <SessionProvider>
            <ToastProvider>
              {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
