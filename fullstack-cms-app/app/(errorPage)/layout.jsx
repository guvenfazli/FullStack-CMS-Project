"use client"
import localFont from "next/font/local";
import "../globals.css";
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
      <body className={`${geistSans.variable} ${geistMono.variable} flex justify-center items-center h-dvh antialiased bg-gray-800`}>
        {children}
      </body>
    </html>
  );
}
