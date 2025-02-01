import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/nav/Header";
import bgImg from '@/assets/ruinsbg.jpg';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D&D App",
  description: "A dungeons and dragons project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bgImg.src})` }}>
          <Header />
          <div className="h-screen overflow-y-auto scrollbar-light">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
