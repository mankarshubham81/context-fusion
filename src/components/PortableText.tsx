// components/PortableText.tsx
'use client'; // Ensure this is a Client Component

import React from 'react';
import {
  PortableText as PortableTextComponent,
  PortableTextComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
} from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import { PortableTextBlock, LinkMarkDefinition  } from '../app/types'; // Adjust the path as necessary

// Define specific interfaces for type safety
interface CodeBlockValue {
  language?: string;
  code: string;
}

interface ImageBlockValue {
  asset?: {
    url: string;
  };
  alt?: string;
}

const components: Partial<PortableTextComponents> = {
  types: {
    code: ({ value }: { value: CodeBlockValue }) => {
      const validLanguages = ['javascript', 'typescript', 'html', 'css', 'python'];
      const language = value.language && validLanguages.includes(value.language) ? value.language : 'text';
      return (
        <SyntaxHighlighter language={language} style={dracula}>
          {value.code}
        </SyntaxHighlighter>
      );
    },
    image: ({ value }: { value: ImageBlockValue }) => {
      if (!value.asset?.url) return null;
      return (
        <div className="my-8">
          <Image
            src={value.asset.url}
            alt={value.alt || 'Blog Image'}
            width={800}
            height={600}
            className="rounded"
            loading="lazy"
            // onError={(e) => {
            //   e.currentTarget.src = '/fallback-image.jpg'; // Ensure this fallback image exists in your public directory
            // }}
          />
        </div>
      );
    },
    // Add more types as needed
  },
  block: {
    h1: ({ children, ...props }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children, ...props }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-semibold my-3">{children}</h2>
    ),
    h3: ({ children, ...props }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-medium my-2">{children}</h3>
    ),
    normal: ({ children, ...props }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="text-base leading-7 my-2">{children}</p>
    ),
    // Add more block styles as needed
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMarkDefinition>) => {
      const href = value?.href;

      if (!href) {
        // If href is not provided, render the children without a link
        return <span>{children}</span>;
      }

      // Determine if the link is external
      const isExternal = href.startsWith('http');

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-500 hover:underline"
        >
          {children}
        </a>
      );
    },
    // Add more marks as needed
  },
  // No 'unknown' key; rely on default rendering
};

interface PortableTextProps {
  content: PortableTextBlock[];
}

const PortableText: React.FC<PortableTextProps> = ({ content }) => {
  if (!Array.isArray(content) || content.length === 0) {
    return <p>No content available.</p>;
  }

  // Filter out invalid blocks
  const validContent = content.filter(
    (block) => block && typeof block === 'object' && '_type' in block && '_key' in block
  );

  if (validContent.length === 0) {
    return <p>No content available.</p>;
  }

  return <PortableTextComponent value={validContent} components={components} />;
};

export default PortableText;