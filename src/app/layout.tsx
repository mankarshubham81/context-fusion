import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

// Metadata for SEO and Open Graph details
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5aaf48b2-433e-4c94-8711-d3c4a96dd240"></script>
      </head>
      <body
        className="antialiased font-serif"
      >
        <ThemeProvider attribute="class">
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
          <Footer />
      </body>
    </html>
  );
}
