// app/blog/layout.tsx

// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer'; // Assuming Footer is also used
import React from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
