import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts'; // Mock data (replace with API/CMS)
// import { client } from '@/sanity';
// import { client as sanityClient } from '../sanity/lib/client';
import { client as sanityClient } from '../../../sanity/lib/client';
import { Console } from 'console';


// type BlogPost = {
//   slug: string;
//   title: string;
//   content: string;
//   category: string;
//   date: string;
//   author: string;
//   imageUrl: string;
// };

// Define a type for the mainImage field
type MainImage = {
  asset: {
    url: string;
  };
  alt: string;
};

// Define a type for categories
type Category = {
  title: string;
};

// Define the blog post data type
interface BlogPost {
  title: string;
  slug: { current: string };
  authorName: string;
  mainImage: MainImage; // Use the defined MainImage type
  categories: Category[];
  publishedAt: string;
  excerpt: string;
  readingTime: number;
  body: BlockContent[];
}

interface BlockContent {
  _type: string;
  style?: string;
  _key: string;
  markDefs: any[];  // You can define this more specifically if you know the structure
  children: BlockChildren[];
}

interface BlockChildren {
  _type: string;
  _key: string;
  text: string;
  marks: string[]; // or other specific types for the marks array
}


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


// Define TypeScript types for post structure
interface Child {
  _key: string;
  text: string;
}

interface Block {
  _key: string;
  _type: string;
  children?: Child[];
  style?: string;
  listItem?: string;
  code?: string;
  language?: string;
}

// interface MainImage {
//   asset: {
//     url: string;
//   };
//   alt: string;
// }

interface Post {
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  mainImage: MainImage;
  body: Block[];
}

interface Props {
  post: Post;
}


// const query = `*[_type == "post" && slug.current == $slug][0]{
//   title,
//   "slug": slug.current,
//   "author": author->name,
//   mainImage{
//     asset->{url},
//     alt
//   },
//   categories[]->{
//     title
//   },
//   publishedAt,
//   body,  // Replace with your content field (e.g., body)
//   excerpt
// }`;

const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const post: BlogPost = await sanityClient.fetch(query, { slug });

  if (!post) {
    return null; // Handle cases where the post is not found
  }
  return post;
};


// Utility function to extract plain text from block content
const extractTextFromBody = (body: BlockContent[]): string => {
  return body
    .map((block) =>
      block.children.map((child) => child.text).join(' ')
    )
    .join(' ')
    .slice(0, 150); // Limiting to 150 characters for description
};

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  console.log("post 125", post);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || extractTextFromBody(post.body), // Use excerpt or extracted text
    keywords: post.categories.map((cat) => cat.title).join(', '),
  };
}

// Page Component
// const BlogPostDetail: React.FC<Props> = ({ post }) => {
const BlogPostDetail = async ({ params }: { params: { slug: string } }) => {

    const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }


  const renderBlock = (block: Block) => {
    if (block._type === 'code' && block.code) {
      return (
        <pre key={block._key}>
          <code className={`language-${block.language || 'text'}`}>
            {block.code}
          </code>
        </pre>
      );
    }

    if (block.children && block.children.length > 0) {
      const content = block.children.map((child) => (
        <span key={child._key}>{child.text}</span>
      ));

      switch (block.style) {
        case 'h2':
          return <h2 key={block._key}>{content}</h2>;
        case 'h3':
          return <h3 key={block._key}>{content}</h3>;
        case 'h4':
          return <h4 key={block._key}>{content}</h4>;
        case 'normal':
          return <p key={block._key}>{content}</p>;
        default:
          return <p key={block._key}>{content}</p>;
      }
    }

    return null;
  };

  const renderListItem = (block: Block) => {
    if (block.listItem) {
      return <li key={block._key}>{block.children?.map(child => child.text).join(' ')}</li>;
    }
    return null;
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      {post.mainImage?.asset?.url && (
        <img src={post.mainImage.asset.url} alt={post.mainImage.alt || 'Main image'} />
      )}
      <p>By {post.authorName}</p>
      <p>Published at {new Date(post.publishedAt).toDateString()}</p>

      {post.body.map((block) => {
        return block.children ? renderListItem(block) : renderBlock(block);
      })}
    </div>
  );
};

export default BlogPostDetail;
// const BlogPostDetail = async ({ params }: { params: { slug: string } }) => {
//   const post = await getPostBySlug(params.slug);

//   if (!post) {
//     return notFound();
//   }

//   return (
//     <div>
//       <main className="container mx-auto py-10 px-4">
//         <article className="max-w-4xl mx-auto">
//           {/* Blog Image */}
//           <div className="mb-8">
//             <Image
//               src={post.mainImage?.asset.url}
//               alt={post.mainImage?.alt}
//               width={1200}
//               height={600}
//               className="w-full h-64 object-cover rounded-md shadow-lg"
//             />
//           </div>

//           {/* Blog Header */}
//           <h1 className="mt-6 text-3xl font-bold text-gray-800">{post.title}</h1>
//           <div className="mt-4 flex items-center space-x-4">
//             <p className="text-gray-500">
//               By <span className="font-semibold">{post.authorName}</span> • {new Date(post.publishedAt).toLocaleDateString()}
//             </p>
//             <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
//               {post.categories.map((cat) => cat.title).join(', ')}
//             </span>
//           </div>

//           {/* Blog Content */}
//           <div className="prose prose-lg max-w-none text-gray-100 mt-6">
//             {post.body.map((block) => (
//               <div key={block._key}>
//                 {block.children.map((child) => (
//                   <p key={child._key}>{child.text}</p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </article>
//       </main>
//     </div>
//   );
// };

// export default BlogPostDetail;