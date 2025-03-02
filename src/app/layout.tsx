import type { Metadata } from 'next';
import { ApolloWrapper } from './ApolloWrapper';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/nav/Header';
import bgImg from '@/assets/darkBg.webp';

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
        <div className="h-screen overflow-hidden bg-cover bg-center flex flex-col" style={{ backgroundImage: `url(${bgImg.src})` }}>
          <Header />
          <div className="overflow-y-auto scrollbar-light flex-1">
            <ApolloWrapper>{children}</ApolloWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
