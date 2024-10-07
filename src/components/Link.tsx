/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    // @ts-ignore
    return <Link href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;

// link: ({ children, value }: PortableTextMarkComponentProps<{ href?: string }>) => {
//   const href = value?.href;

//   if (!href) {
//     // If href is not provided, render the children without a link
//     return <span>{children}</span>;
//   }

//   // Determine if the link is external
//   const isExternal = href.startsWith('http');

//   return (
//     <a
//       href={href}
//       target={isExternal ? '_blank' : undefined}
//       rel={isExternal ? 'noopener noreferrer' : undefined}
//       className="text-blue-500 hover:underline"
//     >
//       {children}
//     </a>
//   );
// }
