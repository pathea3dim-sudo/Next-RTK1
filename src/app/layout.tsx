import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProdiver";



export const metadata: Metadata = {
  title: "Product",
  description: "Display product API with RTK Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        {/* {children} */}
        <StoreProvider >{children}</StoreProvider>

      </body>
    </html>
  );
}
