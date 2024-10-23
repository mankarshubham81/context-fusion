import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { formatToShortIST } from '@/utils/formatIst';

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
                name: 'Context Fusion',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://context-fusion.vercel.app/context_fusoion.png',
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://context-fusion.vercel.app/blog/${slug}`,
              },
            }),
          }}
        />
      </Head>

      {/* Blog Post Layout */}
      <article className="relative h-full rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
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
          <h2 className="text-2xl font-bold leading-tight mb-2 mx-2 mt-2" itemProp="headline">
            {title}
          </h2>
          <div className="flex items-center text-sm text-gray-400 mb-2 mx-2">
            <time dateTime={date} itemProp="datePublished">
              {formatToShortIST(date)} {/* Shorter date format for SEO */}
            </time>
            <span className="mx-2">•</span>
            <span itemProp="author">{author}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 mx-2">
            {excerpt}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-white shrink-0 bg-purple-900 rounded-full px-4 py-2  ml-2 text-sm font-semibold">
              {category}
            </span>

            <button
              className={`px-4 py-2 mr-2
                text-white
                border-2
                shrink-0
                dark:bg-black
                bg-customBlue
                transition-all
                rounded-md
                border-customBlue hover:text-white hover:bg-black dark:hover:bg-customBlue
                duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-gray-500
                min-h-[48px] min-w-[48px]
              `}
            >
              <Link href={`/blog/${slug}`}>
                Read More...
              </Link>
            </button>
          </div>
      </article>
    </>
  );
};

export default BlogPost;
