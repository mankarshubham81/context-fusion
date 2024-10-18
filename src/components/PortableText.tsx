'use client'; // Ensure this is a Client Component

import React, { useState } from 'react';
import {
  PortableText as PortableTextComponent,
  PortableTextComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
} from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // Import multiple styles if needed
import Image from 'next/image';
import { PortableTextBlock, LinkMarkDefinition } from '../app/types'; // Adjust the path as necessary
// import { PortableTextBlock, LinkMarkDefinition, VideoBlock } from '../app/types'; // Adjust the path as necessary
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCheck } from 'react-icons/fa'; // Icons for copy button

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

interface VideoBlockValue {
  _type: 'video';
  url: string;
  title?: string;
}

const CodeBlock: React.FC<{ value: CodeBlockValue }> = ({ value }) => {
  const validLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'c',
    'cpp',
    'csharp',
    'ruby',
    'go',
    'php',
    'swift',
    'kotlin',
    'rust',
    'scala',
    'perl',
    'sql',
    'bash',
    'html',
    'css',
    'json',
    'markdown',
    'yaml',
    'shell',
    'docker',
    'graphql',
    'jsx',
    'tsx',
    // Add more languages as needed
  ];

  const language = value.language && validLanguages.includes(value.language) ? value.language : 'text';

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative">
      <CopyToClipboard text={value.code} onCopy={handleCopy}>
          <button
            className="flex align-middle items-center absolute top-2 right-2 rounded text-gray-200 bg-gray-900 p-2"
            aria-label="Copy code"
          >
            {copied ? <FaCheck className='mx-2' /> : <FaRegCopy className='mx-2' />}
            <span className="text-m px-1">{copied ? 'Copied' : 'Copy code'}</span>
          </button>
        </CopyToClipboard>
      <SyntaxHighlighter language={language} style={dracula} showLineNumbers>
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
};

const components: Partial<PortableTextComponents> = {
  types: {
    code: ({ value }: { value: CodeBlockValue }) => <CodeBlock value={value} />,
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
            // Uncomment and ensure fallback image exists
            // onError={(e) => {
            //   e.currentTarget.src = '/fallback-image.jpg';
            // }}
          />
        </div>
      );
    },
    video: ({ value }: { value: VideoBlockValue }) => {
      // Validate the video URL format
      const isYouTube = value.url.includes('youtube.com') || value.url.includes('youtu.be');
      const isVimeo = value.url.includes('vimeo.com');

      const getYouTubeEmbedUrl = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
      };

      const getVimeoEmbedUrl = (url: string) => {
        const regex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:\w+\/)?videos\/|video\/|)(\d+)/i;
        const match = url.match(regex);
        return match ? `https://player.vimeo.com/video/${match[1]}` : null;
      };

      let embedUrl: string | null = null;

      if (isYouTube) {
        embedUrl = getYouTubeEmbedUrl(value.url);
      } else if (isVimeo) {
        embedUrl = getVimeoEmbedUrl(value.url);
      } else {
        // Assume direct video file
        embedUrl = value.url;
      }

      if (!embedUrl) return null;

      return (
        <div className="my-8 aspect-video">
          {isYouTube || isVimeo ? (
            <iframe
              src={embedUrl}
              title={value.title || 'Embedded Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          ) : (
            <video controls className="w-full h-full rounded">
              <source src={embedUrl} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      );
    },
    // Add more types as needed
  },
  block: {
    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold my-3">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-semibold my-2">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-medium my-1">{children}</h3>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="text-base leading-7 my-1">{children}</p>
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

// Filter out invalid blocks, including those without children
  const validContent = content.filter(
    (block) =>
      block &&
      typeof block === 'object' &&
      '_type' in block &&
      '_key' in block
  );

  if (validContent.length === 0) {
    return <p>No content available.</p>;
  }

  return <PortableTextComponent value={validContent} components={components} />;
};

export default PortableText;
