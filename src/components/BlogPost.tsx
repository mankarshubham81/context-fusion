// components/BlogPost.tsx
import Link from 'next/link';

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
    <article className="shadow-lg rounded-lg overflow-hidden">
      <Link href={`/blog/${slug}`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover transition-transform hover:scale-105"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-500 mb-1">
              {date} by {author}
            </p>
            <p className="text-gray-400 mb-1">Category: {category}</p>
            <p className="text-gray-700">{excerpt}</p>
          </div>
      </Link>
    </article>
  );
};

export default BlogPost;
