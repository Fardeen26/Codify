import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react"

import "./globals.css";
import Providers from "@/provider/Providers";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codify - Generate Code Snippets",
  description: "Designed and Developed by Fardeen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${bricolage_grotesque_init.className} dark:bg-black bg-gray-100 min-h-screen`}
        >
          <Header />
          {children}
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
