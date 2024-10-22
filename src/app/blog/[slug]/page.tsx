import { notFound } from 'next/navigation';
import { client as sanityClient } from '../../../sanity/lib/client';
import { BlogPost } from '../../types';
import React from 'react';
import PortableText from '../../../components/PortableText';
import Image from 'next/image';
import { blogQuery } from '@/sanity/lib/queries';
import { formatToShortIST } from './../../../utils/formatIst';
import { Metadata } from 'next';

interface BlogProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogProps): Promise<Metadata> {
  const post = await sanityClient.fetch(blogQuery, { slug: params.slug });

  if (!post) {
    return notFound();
  }

  return {
    title: `${post.seoTitle || post.title} | Context Fusion`,
    description: post.seoDescription || post.excerpt,
    keywords: post.metaKeywords ? post.metaKeywords.join(', ') : '',
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `https://context-fusion.vercel.app/blog/${post.slug}`,
      images: [
        {
          url: post.mainImage?.asset.url || '../../icon.png',
          width: 800,
          height: 600,
          alt: post.mainImage?.alt || 'Blog post image',
        },
      ],
    },
  };
}

const Blog = async ({ params }: BlogProps) => {
  const { slug } = params;

  const post: BlogPost = await sanityClient.fetch(blogQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto mt-16 px-3 py-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center mb-6 text-gray-600 dark:text-gray-300">
        <span>By {post.author || 'Unknown Author'}</span>
        <span className="mx-2">|</span>
        <span>{formatToShortIST(post.publishedAt)}</span>
      </div>
      {post.mainImage?.asset?.url && (
        <div className="mb-6">
          <Image
            src={post?.mainImage?.asset.url}
            alt={post.mainImage.alt || 'Main Image'}
            width={800}
            height={600}
            className="rounded"
            loading="lazy"
          />
        </div>
      )}
      <PortableText content={post.body} />
    </article>
  );
};

export default Blog;

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const blogQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(blogQuery);

  return slugs.map((slug) => ({
    slug,
  }));
}
