"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Header() {
  // Hardcoded static data
  const title = "My Website";
  const logo = {
    image: {
      dark: "/logo-dark.png",
      default: "/logo-default.png",
    },
    name: "My Website",
  };

  const ctas = [
    {
      label: 'Sign Up',
      href: '/signup',
    },
    {
      label: 'Log In',
      href: '/login',
    },
  ];

  // Determine which logo to use
  const logoImage = logo?.image?.dark || logo?.image?.default;

  // State to control mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-gray-800 rounded-b-md border-b border-gray-500">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div>
          <Link href="/" passHref>
            {logoImage ? (
              <Image src={logoImage} alt={logo?.name || title} width={120} height={40} />
            ) : (
              <span className="text-xl font-bold text-white">{title}</span>
            )}
          </Link>
        </div>

        {/* Hamburger Menu Icon (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Menu (visible on medium and above screens) */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:underline text-white">
            Home
          </Link>
          <Link href="/about" className="hover:underline text-white">
            About
          </Link>
          <Link href="/services" className="hover:underline text-white">
            Services
          </Link>
        </nav>

        {/* Call-to-action buttons (visible on medium and above screens) */}
        <div className="hidden md:flex space-x-4">
          {ctas.map((cta, index) => (
            <Link key={index} href={cta.href} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {cta.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu (visible when hamburger menu is clicked) */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/" className="hover:underline text-white">
              Home
            </Link>
            <Link href="/about" className="hover:underline text-white">
              About
            </Link>
            <Link href="/services" className="hover:underline text-white">
              Services
            </Link>
          </nav>

          <div className="flex flex-col space-y-2 p-4">
            {ctas.map((cta, index) => (
              <Link key={index} href={cta.href} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
