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
    <Link href={`/blog/${slug}`}>
      <article className="mb-10">
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover mb-4 rounded-tr-md rounded-tl-md" />
      <div className='p-2'>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 mb-2">{date} by {author}</p>
        <p>{excerpt}</p>
      </div>
        {/* <button className="mt-4 text-blue-600 hover:underline">Read more</button> */}
      </article>
    </Link>
  );
};

export default BlogPost;
