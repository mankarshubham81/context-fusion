"use client";

// import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import AnalyticsLink from './AnalyticsLink';


export const headerNavLinks = [
  {
    title: 'Home',
    href: '/',
    description: 'Go back to the homepage',
  },
  {
    title: 'Blog',
    href: '/blog',
    description: 'Explore latest posts, articles, and insights',
  },
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
    <header className="supports-backdrop-blur fixed left-0 right-0 top-0 z-40 bg-gray-200 text-black py-4 backdrop-blur dark:dark:bg-gray-900 dark:text-white border-b-2 shadow-lg border-gray-300 dark:border-none">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label="Context Fusion" className="flex items-center">
          <div className="animate-wave">Logo</div>
          <div className="group ml-2 text-xl font-bold transition duration-300 text-customBlue">
            Context Fusion
            <span className="block h-0.5 max-w-0 bg-black6fg g transition-all duration-500 group-hover:max-w-[85%] bg-gray-200  dark:dark:bg-gray-900 dark:text-white"></span>
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
