import { notFound } from 'next/navigation';
import { client as sanityClient } from '../../../sanity/lib/client';
import { BlogPost } from '../../types';
import React from 'react';
import PortableText from '../../../components/PortableText';
import Image from 'next/image';
import Head from 'next/head';
import { blogQuery } from '@/sanity/lib/queries';

interface BlogProps {
  params: { slug: string };
}

const Blog = async ({ params }: BlogProps) => {
  const { slug } = params;
    

  // Helper function to format date for SEO and user readability
  // Note: name seprate function for it for use this function for multiple cases 
  const formatToShortIST = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
      // year: 'numeric',
      // month: 'long',
      // day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // timeZone: 'Asia/Kolkata',
      // timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
  };

  const post: BlogPost = await sanityClient.fetch(blogQuery, { slug });
  // console.log("ppp",post)

  if (!post) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        {/* Add more SEO tags as needed */}
      </Head>
      <article className="max-w-3xl mx-auto mt-16 px-3 py-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-6 text-gray-600 dark:text-gray-300">
          <span >By {post.author || 'Unknown Author'}</span>
          <span className="mx-2">|</span>
          <span >{formatToShortIST(post.publishedAt)}</span>
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
              // onError={(e) => {
              //   e.currentTarget.src = '/fallback-image.jpg';
              // }}
            />
          </div>
        )}
        <PortableText content={post.body} />
      </article>
    </>
  );
};

export default Blog;

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const blogQuery = `*[_type == "blog" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(blogQuery);

  return slugs.map((slug) => ({
    slug,
  }));
}
