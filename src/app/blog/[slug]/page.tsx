import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts'; // Mock data (replace with API/CMS)

type BlogPost = {
  slug: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
};

// Fetching blog post based on slug
const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 150),
    keywords: post.category,
  };
}

// Page Component
const BlogPostDetail = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug);
  console.log("slug 48: ", params.slug)

  if (!post) {
    return notFound();
  }

  return (
    <div>
      {/* <Navbar /> */}
      <main className="container mx-auto py-10 px-4">
        <article className="max-w-4xl mx-auto">
          {/* Blog Image */}
          <div className="mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-64 object-cover rounded-md shadow-lg"
            />
          </div>

          {/* Blog Header */}
          <h1 className="mt-6 text-3xl font-bold text-gray-800">{post.title}</h1>
          <div className="mt-4 flex items-center space-x-4">
            <p className="text-gray-500">
              By <span className="font-semibold">{post.author}</span> • {post.date}
            </p>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              {post.category}
            </span>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-gray-700 mt-6">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default BlogPostDetail;
