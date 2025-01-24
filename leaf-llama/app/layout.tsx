import type { Metadata } from "next";
import "./globals.css";
import { kaushanVar, robotoVar } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Leaf Llama",
  description: "Lettuce eat!",
};

import {Roboto, Kaushan_Script} from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoVar} ${kaushanVar}`}
      >
        {children}
      </body>
    </html>
  );
}
