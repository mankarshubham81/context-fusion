// components/BlogPost.tsx
import Link from 'next/link';
import Image from 'next/image';


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
    <article className="shadow-lg rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-200 overflow-hidden shadow-lg">
      <Link href={`/blog/${slug}`}>
          <img
          />
          <Image
            src={imageUrl}
            className="w-full h-34 object-cover transition-transform hover:scale-100"
            loading="lazy"
            width={200}
            alt={title || "blog Image"}
            height={100}
            // Uncomment and ensure fallback image exists
            // onError={(e) => {
            //   e.currentTarget.src = '/fallback-image.jpg';
            // }}
          />
          <div className="p-4 relative">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-500 mb-1">
              {date} by {author}
            </p>
            <p className="text-gray-400 mb-1">Category: {category}</p>
            <p className="text-gray-700">{excerpt}</p>
            <p className="flex float-end m-1 text-customBlue hover:underline font-semibold">
            {category}
          </p>
          </div>
      </Link>
    </article>
  );
};

export default BlogPost;
