import { notFound } from 'next/navigation';
import { client as sanityClient } from '../../../sanity/lib/client';
import { BlogPost } from '../../types';
import React from 'react';
import PortableText from '../../../components/PortableText';
import Image from 'next/image';
import Head from 'next/head';

interface BlogProps {
  params: { slug: string };
}

const Blog = async ({ params }: BlogProps) => {
  const { slug } = params;
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      "author": author->name,
      mainImage{
        asset->{url},
        alt
      },
      categories[]->{
        title
      },
      publishedAt,
      body,  
      excerpt
    }`;

  const post: BlogPost = await sanityClient.fetch(query, { slug });
  console.log("ppp",post)

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
      <article className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-6">
          <span className="text-gray-600">By {post.author || 'Unknown Author'}</span>
          <span className="mx-2">|</span>
          <span className="text-gray-600">{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        {post.mainImage?.asset?.url && (
          <div className="mb-6">
            <Image
              src={post.mainImage.asset.url}
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
  const query = `*[_type == "blog" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(query);

  return slugs.map((slug) => ({
    slug,
  }));
}
