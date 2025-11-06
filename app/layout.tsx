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
  icons: [
    {
      rel: 'icon',
      url: '/eagle.png',
      type: 'image/png',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      url: '/eagle.png',
      type: 'image/png',
      sizes: '16x16'
    },
    {
      rel: 'apple-touch-icon',
      url: '/eagle.png',
      type: 'image/png',
      sizes: '180x180'
    }
  ]
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
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="canonical" href="https://your-domain.vercel.app" />
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
