"use client"
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header/Header";
import NavBar from "@/components/NavBar/NavBar";
import { AppWrapper } from "@/context";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import Loading from "./loading";
import { Toaster } from "@/components/ui/toaster"
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {

  const [isNavBar, setIsNavBar] = useState(false)


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800`}>
        <AppWrapper>
          <Header />
          <div className="flex flex-row">

            <div className={`py-5 px-2 w-1/6 max-[981px]:w-auto rounded-lg relative max-md:hidden max-[850px]:hidden max-[981px]:absolute max-[981px]:bg-gray-500 max-[981px]:py-2 max-[981px]:text-black max-[981px]:text-lg duration-75 max-[981px]:z-50 ${isNavBar ? 'max-[981px]:left-0' : 'max-[981px]:-left-32'}`}>
              
              <div className="flex w-full relative justify-end min-[981px]:hidden">
                <button onClick={() => setIsNavBar(prev => !prev)} className={`absolute bg-gray-500 rounded-lg px-2 text-white -right-9 duration-75 ${isNavBar ? 'rotate-180' : 'rotate-0'}`}>&gt;</button>
              </div>
              <NavBar />
            
            </div>
            
            <Suspense fallback={<Loading />}>
              <div className="w-full p-5">
                {children}
                <Toaster />
              </div>
            </Suspense>

          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
