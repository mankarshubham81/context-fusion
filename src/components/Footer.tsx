// components/PortableText.tsx
'use client'; // Ensure this is a Client Component

import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { client } from '@/sanity/lib/client';
// import { FETCH_FOOTER } from '@/sanity/queries/footer/fetch-footer';
// import { FETCH_FOOTERResult } from '@/types/generated/sanity.types';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
// import { FETCH_FOOTER } from './../../../sanity/queries/footer/fetch-footer';
interface SocialIconProps {
  href: string;
  icon: JSX.Element;
}

interface UsefulLink {
  _key: string;
  usefulLinkName: string;
  usefulLinkPath: string;
}

// Type for the footer data structure
interface FooterData {
  usefulLinks: UsefulLink[];
}

const sampleFooterData: FooterData = {
  usefulLinks: [
    {
      _key: '1',
      usefulLinkName: 'Home',
      usefulLinkPath: '/',
    },
    {
      _key: '2',
      usefulLinkName: 'About Me',
      usefulLinkPath: '/about',
    },
    {
      _key: '3',
      usefulLinkName: 'Connect',
      usefulLinkPath: '/connect',
    },
  ],
};

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | undefined>();

  useEffect(() => {
    const fetchFooterData = async () => {
      // Replace with actual data fetching logic if needed
      setFooterData(sampleFooterData);
      console.log('footerData:', sampleFooterData);
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Company Logo and Page Links */}
          <div className="flex flex-col justify-between items-center md:items-center">
            {/* <img src="/logo.png" alt="Company Logo" className="w-20 mb-4" /> */}
            <h1 className="text-bold mb-4">Company Logo</h1>
            <ul className="text-center">
              {footerData?.usefulLinks.map(({ _key, usefulLinkName, usefulLinkPath }) => (
                <li key={_key} className="mb-2 mt-1">
                  <Link className="hover:underline" href={usefulLinkPath}>
                    {usefulLinkName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Address */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <p className="mb-2">Chatrapati colony</p>
            <p className="mb-2">Chatrapati Sambhajinagar, Maharashtra</p>
            <p>{"+917391014689"}</p>
          </div>

          {/* Section 3: Social Media Icons */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <SocialIcon href="https://www.facebook.com/chandrashekhar.mahamuni" icon={<FaFacebook size={'25px'} />} />
              <SocialIcon href="#" icon={<FaTwitter size={'25px'} />} />
              <SocialIcon href="#" icon={<FaInstagram size={'25px'} />} />
              <SocialIcon href="https://www.youtube.com/user/shekharmahamuni/featured" icon={<FaYoutube size={'25px'} />} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Context Fusion. All rights reserved.</p>
      </div>
    </footer>
  );
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon }) => (
  <a href={href} className="hover:text-blue-500" target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);
