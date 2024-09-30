"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';
import BlogPost from '../components/BlogPost';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Head from 'next/head';

// Sample Categories and Posts
const categories = ['All', 'Technology', 'Lifestyle', 'Business', 'Travel', 'Food', 'Health'];

const blogPosts = [
  {
    slug: 'mastering-nextjs',
    title: 'Mastering Next.js: Best Practices for SEO',
    excerpt: 'Learn how to optimize your Next.js applications for search engines with practical tips and examples...',
    category: 'Technology',
    date: 'September 25, 2024',
    author: 'John Doe',
    imageUrl: 'https://via.placeholder.com/300x200?text=Next.js+SEO',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Lifestyle',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: 'How to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Business',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Mastering Next.js: Best Practices for SEO',
    excerpt: 'Learn how to optimize your Next.js applications for search engines with practical tips and examples...',
    category: 'Technology',
    date: 'September 25, 2024',
    author: 'John Doe',
    imageUrl: 'https://via.placeholder.com/300x200?text=Next.js+SEO',
  },
  {
    title: '10 Tips to Maintain a Healthy Work-Life Balance',
    excerpt: 'Struggling to find balance between your work and personal life? Here are 10 tips to help you manage stress...',
    category: 'Food',
    date: 'September 20, 2024',
    author: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/300x200?text=Work-Life+Balance',
  },
  {
    title: 'hhhhhHow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhh to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  {
    title: 'Hhhhow to Start a Successful Business in 2024',
    excerpt: 'Starting a business in 2024 requires careful planning and strategy. Here’s how you can set up for success...',
    category: 'Health',
    date: 'September 15, 2024',
    author: 'Michael Brown',
    imageUrl: 'https://via.placeholder.com/300x200?text=Business+2024',
  },
  
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const postsPerPage = 4;  // 2x2 grid means 4 posts per page

  // Function to filter posts by category and search term
  const filterPosts = () => {
    let updatedPosts = selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

    if (searchTerm.trim()) {
      updatedPosts = updatedPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return updatedPosts;
  };

  useEffect(() => {
    const filtered = filterPosts();
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to the first page when search or category changes
  }, [searchTerm, selectedCategory]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Head>
        <title>My Blog | Best SEO Practices</title>
        <meta name="description" content="A modern blog built with Next.js, covering topics such as technology, lifestyle, and business." />
        <meta name="keywords" content="Next.js, blog, SEO, lifestyle, business" />
        <meta name="author" content="John Doe" />
      </Head>

      <Navbar />

      <main className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Section */}
          <aside className="md:col-span-1">
            <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
          </aside>

          {/* Blog Posts Section */}
          <section className="md:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Blog Post Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <div key={index} className="cursor-pointer transition-transform duration-300 hover:scale-105 rounded-md shadow-lg">
                    <BlogPost
                      slug={post.slug}
                      key={index}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.category}
                      date={post.date}
                      author={post.author}
                      imageUrl={post.imageUrl}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No posts found.</p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
