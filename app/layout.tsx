import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Trung Anh - Software Developer",
  description: "Professional Portfolio",
  icons: {
    icon: '/eagle.png',
    shortcut: '/eagle.png',
    apple: '/eagle.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/eagle.png" sizes="any" />
        <link rel="shortcut icon" href="/eagle.png" />
        <link rel="apple-touch-icon" href="/eagle.png" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-900 text-white">
          <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
