// components/BlogPost.tsx
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

interface BlogPostProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  slug?: string;
}

const BlogPost = ({ slug, title, excerpt, category, date, author, imageUrl }: BlogPostProps) => {
  return (
    <>
      {/* SEO and Metadata for Google */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://context-fusion.vercel.app/blog/${slug}`} />
        <meta name="twitter:card" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: title,
              description: excerpt,
              image: imageUrl,
              author: {
                '@type': 'Person',
                name: author,
              },
              datePublished: date,
              publisher: {
                '@type': 'Organization',
                name: 'Your Blog Name',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://yourwebsite.com/logo.jpg', // Add your website logo URL
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://yourwebsite.com/blog/${slug}`,
              },
            }),
          }}
        />
      </Head>

      {/* Blog Post Layout */}
      <article className="relative h-full rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <Link href={`/blog/${slug}`} className="block">
            <header className="relative">
              <Image
                src={imageUrl}
                className="w-full h-52 object-cover lg:h-64"
                loading="lazy"
                width={800}
                height={450}
                alt={title} // Ensure good alt text for accessibility
              />
            </header>
            <div className="p-6">
              <h1 className="text-2xl font-bold leading-tight mb-2" itemProp="headline">
                {title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time dateTime={new Date(date).toISOString()} itemProp="datePublished">
                  {date}
                </time>
                <span className="mx-2">•</span>
                <span itemProp="author">{author}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {excerpt}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-customBlue text-sm font-semibold">
                  {category}
                </span>
                <button className="text-customBlue text-sm font-semibold underline">
                  Read More
                </button>
              </div>
            </div>
        </Link>
      </article>
    </>
  );
};

export default BlogPost;
