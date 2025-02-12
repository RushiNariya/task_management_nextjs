import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// import NextAuthSessionProvider from "@/components/sessionProvider";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/redux/provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <NextAuthSessionProvider> */}
        <Toaster position="top-center" reverseOrder={false} />
        <Providers>{children}</Providers>
        {/* </NextAuthSessionProvider> */}
      </body>
    </html>
  );
}
