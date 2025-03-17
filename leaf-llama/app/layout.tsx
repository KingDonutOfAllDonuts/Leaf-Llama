import type { Metadata } from "next";
import "./globals.css";
import { kaushanVar, loraVar, poorVar, varelaVar } from "@/lib/fonts";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Leaf Llama",
  description: "Lettuce eat!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${loraVar} ${kaushanVar} ${varelaVar} ${poorVar}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
