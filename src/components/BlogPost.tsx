// import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { formatToShortIST } from "@/utils/formatIst";

interface BlogPostProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  slug?: string;
}

// Metadata generation for SEO and social sharing
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { title, excerpt, imageUrl, slug } = await fetchBlogPostData(params.slug);

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `https://context-fusion.vercel.app/blog/${params.slug}`,
      images: [{ url: imageUrl, width: 800, height: 450 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt + slug,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://context-fusion.vercel.app/blog/${params.slug}`,
    },
  };
}

// Mock async data fetch function
async function fetchBlogPostData(slug: string) {
  return {
    slug: slug,
    title: "Sample Title",
    excerpt: "Sample excerpt for SEO.",
    imageUrl: "https://example.com/image.jpg",
  };
}

const BlogPost = ({ slug, title, excerpt, category, date, author, imageUrl }: BlogPostProps) => {
  return (
    <article className="relative h-full rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden">
      <header className="relative">
        <Image
          src={`${imageUrl}?w=800&h=450&fit=crop`} // Adjust the image URL with Sanity-specific transformations
          alt={`Cover image for ${title}`}
          width={800}
          height={450}
          priority
          placeholder="blur"
          blurDataURL={`${imageUrl}?w=10&blur=10`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-52 lg:h-64 object-cover"
        />
      </header>
      <div className="p-6">
        <h2 className="text-2xl font-bold leading-tight mb-2" itemProp="headline">
          {title}
        </h2>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <time dateTime={date} itemProp="datePublished">
            {formatToShortIST(date)}
          </time>
          <span className="mx-2">•</span>
          <span itemProp="author">{author}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4" itemProp="description">
          {excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-white bg-purple-900 rounded-full px-4 py-2 text-sm font-semibold" role="note">
            {category}
          </span>
          {/* <Link
            href={`/blog/${slug}`}
            aria-label={`Read more about ${title}`}
            className="px-4 py-2 text-white border-2 bg-customBlue dark:bg-black rounded-md border-customBlue hover:bg-black dark:hover:bg-customBlue transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
            Read More...
          </Link> */}
          <a
            aria-label={`Read more about ${title}`}
            href={`/blog/${slug}`}
            className="
              px-4 py-2
              text-white
              border-2
              shrink-0
              dark:bg-black
              bg-customBlue
              transition-all
              rounded-md
              border-customBlue
              hover:text-white hover:bg-black
              dark:hover:bg-customBlue
              duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-gray-500
              min-h-[48px] min-w-[48px]
              flex items-center justify-center
            "
          >
            Read More...
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
