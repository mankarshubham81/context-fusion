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
  description:
    "Join Shubham Mankar on Context Fusion, a blog journey where technology meets wisdom. Dive into topics that connect ideas across software engineering, creativity, problem-solving, and personal growth. With actionable insights and accessible explanations, Context Fusion inspires developers, tech enthusiasts, and lifelong learners alike.",
  keywords: [
    "blog",
    "software engineering",
    "MERN stack",
    "JavaScript",
    "technology",
    "learning",
    "coding insights",
    "personal development"
  ],
  openGraph: {
    title: "Context Fusion - A Blog by Shubham Mankar",
    description:
      "Discover Context Fusion, a blog by Shubham Mankar that connects technology, practical wisdom, and personal insights for developers, tech enthusiasts, and lifelong learners.",
    url: "https://context-fusion.vercel.app",
    images: [
      {
        url: "/src/app/icon.png",
        width: 400,
        height: 400,
        alt: "Context Fusion Blog",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "X-UA-Compatible": "IE=edge",
  },
  icons: "https://context-fusion.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontext_fusion.72f1120c.png&w=96&q=75"
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
