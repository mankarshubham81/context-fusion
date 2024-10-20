import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Navbar  from '@/components/Navbar';
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "- Perception on Context",
  description: "Crafted by Context Fusion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{"Context Fusion"}</title>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5aaf48b2-433e-4c94-8711-d3c4a96dd240"></script>
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
          </ThemeProvider>
          <Footer/>
        </body>
      </html>
  );
}
