import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import ChatWidget from '@/components/layout/ChatWidgetWrapper';

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PhoneStore - Hệ thống bán lẻ điện thoại di động",
  description: "Trải nghiệm mua sắm điện thoại di động chính hãng với PhoneStore. Click & Collect tiện lợi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        <Toaster position="top-right" />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
