"use client"
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import { AppWrapper } from "@/context";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {

  const router = usePathname()

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800`}>
        <AppWrapper>
          {router !== '/userLogin' && <Header />}
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
