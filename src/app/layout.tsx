import "./globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
// import ThemeProvider from "@/components/ThemeProvider";
import { ThemeProvider } from 'next-themes';
import { Metadata } from "next";
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer'; 
const inter = Inter({ subsets: ["latin"] });

// const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export const metadata: Metadata = {
  title: "Context Fusion - A Blog by Shubham Mankar",
  description: "Documenting and sharing knowledge, wisdom, and practical lessons from my journey as a software engineer.",
  keywords: ["blog", "software engineering", "MERN stack", "JavaScript", "technology", "learning", "SEO"],
  openGraph: {
    title: "Context Fusion - A Blog by Shubham Mankar",
    description: "Documenting and sharing knowledge and practical lessons from software development.",
    url: "https://context-fusion.vercel.app",
    images: [
      {
        url: "/src/app/icon.png",
        width: 400,
        height: 400,
        alt: "Context Fusion Blog",
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'X-UA-Compatible': 'IE=edge', // Add additional meta tags if needed
  },
  icons: {
    icon: '/src/app/icon.png',
    //TODO: replace above png like below ico
    // icon: '/src/app/favicon.ico',
    
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="5aaf48b2-433e-4c94-8711-d3c4a96dd240"></script>
      </head>
      <body  className="antialiased font-serif">
        <ThemeProvider attribute="class">
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
