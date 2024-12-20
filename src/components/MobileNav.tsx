import { useState } from 'react';
import clsx from 'clsx';


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
    // {
    //   title: 'Categories',
    //   href: '/categories',
    //   description: 'Browse posts by categories for easy navigation',
    // },
    // {
    //   title: 'Authors',
    //   href: '/authors',
    //   description: 'Meet the authors who contribute to the blog',
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
    // {
    //   title: 'Dark Mode',
    //   href: '#',
    //   action: 'toggleDarkMode',
    //   description: 'Switch between dark and light themes',
    // },
  ];

import Link from './Link';

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);

  const className = clsx(
    `sm:hidden fixed w-full h-screen inset-0 bg-gray-800 dark:bg-dark opacity-95 z-50 transition-transform transform ease-in-out duration-300`,
    navShow ? 'translate-x-0' : 'translate-x-full'
  );

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  };

  return (
    <div className="sm:hidden text-white dark:bg-gray-900 dark:text-white">
      <button className="ml-1 mr-1 h-8 w-8 rounded py-1" aria-label="Toggle Menu" onClick={onToggleNav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={className}>
        <div className="flex justify-end">
          <button className="mr-5 mt-5 h-8 w-8 rounded" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="bg-transparent size-8 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full dark:bg-gray-800 dark:text-gray-200">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;