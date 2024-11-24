import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header/Header";
import NavBar from "@/components/NavBar/NavBar";
import { AppWrapper } from "@/context";
import { Suspense } from "react";
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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800`}>
        <AppWrapper>
          <Header />
          <div className="flex flex-row">

            <div className={`py-5 px-2 w-1/6 max-[981px]:w-auto rounded-lg relative max-md:hidden max-[850px]:hidden max-[981px]:absolute max-[981px]:bg-gray-500 max-[981px]:py-2 max-[981px]:text-black max-[981px]:text-lg duration-75 max-[981px]:z-50 `}>
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
