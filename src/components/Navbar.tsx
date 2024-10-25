"use client";

// import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import AnalyticsLink from './AnalyticsLink';
// import Logo from '../../static/images/context-fusion.svg';
import Image from 'next/image';
import logoSrc from '../../static/images/context_fusion.png';

export const headerNavLinks = [
  {
    title: 'Home',
    href: '/',
    description: 'Go back to the homepage',
  },
  // {
  //   title: 'Blog',
  //   href: '/blog',
  //   description: 'Explore latest posts, articles, and insights',
  // },
  {
    title: 'About',
    href: '/about',
    description: 'Learn more about the site and its purpose',
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch for queries or collaborations',
  },
];

const Header = () => {
  // const router = useRouter();  // Ensure this is client-side by "use client" directive at the top

  return (
    <div>
    <header className="supports-backdrop-blur fixed left-0 right-0 top-0 z-10 bg-gray-200 text-black py-4 backdrop-blur dark:dark:bg-gray-900 dark:text-white border-b-2 shadow-[0_-3px_20px_#7C3AED] dark:border-none">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" className="flex items-center">
          <div className="animate-wave">
            <Image
              src={logoSrc}
              alt="Context Fusion Logo"
              priority
              width={40}
              height={40}
              className="rounded-full border-2 border-customBlue hover:[filter:drop-shadow(0_0_2em_#7C3AED)]" // Use dark:invert to switch colors in dark mode
            />
          </div>
          <div className="group ml-4 text-xl font-bold transition duration-300 text-customBlue">
            Context Fusion
            <span className="block h-0.5 max-w-0 bg-black6fg g transition-all duration-500 group-hover:max-w-[100%] bg-customBlue   dark:text-customBlue"></span>
          </div>
        </Link>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={clsx(
                  'mx-1 rounded px-2 py-1 font-medium sm:px-3 sm:py-2 hover:bg-customBlue dark:hover:bg-customBlue ',
                     link.href
                    ? 'text-black bg-gray-200 dark:text-gray-100 dark:bg-gray-900'
                    : 'hover:bg-gray-600 dark:hover:bg-primary'
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <AnalyticsLink />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;
