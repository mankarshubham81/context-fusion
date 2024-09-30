'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { client } from '@/sanity/lib/client';
// import { FETCH_FOOTER } from '@/sanity/queries/footer/fetch-footer';
// import { FETCH_FOOTERResult } from '@/types/generated/sanity.types';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// import { FETCH_FOOTER } from './../../../sanity/queries/footer/fetch-footer';

export interface IFooterProps {}

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
// interface FooterLinkProps {
//   href: string;
//   children: string;
// }

const sampleFooterData = {
    usefulLinks: [
      {
        _key: '1',
        usefulLinkName: 'Home',
        usefulLinkPath: '/',
      },
      {
        _key: '2',
        usefulLinkName: 'About Us',
        usefulLinkPath: '/about',
      },
      {
        _key: '3',
        usefulLinkName: 'Services',
        usefulLinkPath: '/services',
      },
      {
        _key: '4',
        usefulLinkName: 'Contact',
        usefulLinkPath: '/contact',
      },
      {
        _key: '5',
        usefulLinkName: 'Blog',
        usefulLinkPath: '/blog',
      },
    ]
  };
  

export default function Footer(_props: IFooterProps) {
  const [footerData, setFooterData] = useState<FooterData>();

  useEffect(() => {
    const fetchHeaderData = async () => {
    //   const footerDataResult = await client.fetch<FETCH_FOOTERResult>(FETCH_FOOTER);
      setFooterData(sampleFooterData);
      console.log('footerDataResult ff', sampleFooterData);
      // setHeaderData(headerDataResult);
      // const logoAsset = headerDataResult?.logo?.asset;
      // if (logoAsset !== undefined) {
      //   const imageUrl = fetchImageURL(logoAsset._ref);
      //   setLogoUrl(imageUrl);
      // } else {
      //   // TODO: SET BACKUP local IMAGE WITH setLogoUrl(imageUrl);
      // }
    };

    fetchHeaderData();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Company Logo and Page Links */}
          <div className="flex flex-col justify-between items-center md:items-center">
            {/* <img src="/logo.png" alt="Company Logo" className="w-20 mb-4" /> */}
            <h1 className="text-bold mb-4">Company Logo </h1>
            <ul className="text-center">
              {footerData?.usefulLinks?.map(({ _key, usefulLinkName, usefulLinkPath }: {_key: string, usefulLinkName: string, usefulLinkPath: string}) => (
                <li key={_key} className="mb-2 mt-1">
                  <Link className="hover:underline" href={`${usefulLinkPath?.toString()}`}>
                    {usefulLinkName}
                  </Link>
                </li>
              ))}
              {/* // <FooterLink key={_key} href={`${usefulLinkPath?.toString()}`}>
              //   {usefulLinkName}
              // </FooterLink> */}
              {/* <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink> */}
            </ul>
          </div>

          {/* Section 2: Address */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <p className="mb-2">{"chatrapati colony"}</p>
            <p className="mb-2">{"chatrapati sambhajinagar, Mahahashtra"}</p>
            {/* <p className="mb-2">Country</p> */}
            <p>{"+917391014689"}</p>
          </div>

          {/* Section 3: Social Media Icons */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <SocialIcon href="https://www.facebook.com/chandrashekhar.mahamuni" icon={<FaFacebookF size={'25px'} />} />
              {/* <SocialIcon href="#" icon={<FaTwitter size={'25px'} />} /> */}
              {/* <SocialIcon href="#" icon={<FaInstagram size={'25px'} />} /> */}
              <SocialIcon href="https://www.youtube.com/user/shekharmahamuni/featured" icon={<FaYoutube size={'25px'} />} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

// const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
//   <li className="mb-2">
//     <Link href={href} className="hover:underline">
//       {children}
//     </Link>
//   </li>
// );

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon }) => (
  <a href={href} className="hover:text-blue-500">
    {icon}
  </a>
);
