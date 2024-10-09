// pages/index.tsx or app/page.tsx (depending on your Next.js setup)

"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';
import BlogPost from '../components/BlogPost';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Head from 'next/head';
import { client as sanityClient } from '../sanity/lib/client';
import { BlogPostData, Category } from '../app/types';

const query = `*[_type == "post"]{
  title,
  slug,
  "authorName": author->name,
  mainImage{
    asset->{url},
    alt
  },
  categories[]->{
    title,
    slug
  },
  publishedAt,
  excerpt,
  readingTime
}`;

const categoriesQuery = `*[_type == "category"]{
  title,
  slug
}`;

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostData[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPostData[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6; // Number of posts per page

  // Fetch posts and categories from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: BlogPostData[] = await sanityClient.fetch(query);
        const allCategoriesData: Category[] = await sanityClient.fetch(categoriesQuery);
        // console.log('Fetched posts:', data);
        // console.log('Fetched categories:', allCategoriesData);
        setAllPosts(data);
        setAllCategories(allCategoriesData);
        setFilteredPosts(data); // Initial load shows all posts
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      }
    };
    fetchData();
  }, []);

  // Filter posts by category and search term
  useEffect(() => {
    let updatedPosts = selectedCategory === 'All'
      ? allPosts
      : allPosts.filter((post) =>
          post.categories.some((cat: Category) => cat.title === selectedCategory)
        );

    if (searchTerm.trim()) {
      updatedPosts = updatedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(updatedPosts);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [searchTerm, selectedCategory, allPosts]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      <Head>
        <title>My Blog | Best SEO Practices</title>
        <meta
          name="description"
          content="A modern blog built with Next.js, covering topics such as technology, lifestyle, and business."
        />
        <meta
          name="keywords"
          content="Next.js, blog, SEO, lifestyle, business"
        />
        <meta name="author" content="John Doe" />
      </Head>

      <Navbar />

      <main className="left-[calc(-50vw+50%)] relative overflow-hidden sm:mx-2 md:mx-2 py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-16">
          {/* Categories Section */}
          <aside className="md:col-span-2 sm:col-span-1">
            <CategoryList
              categories={allCategories}
              onCategoryClick={handleCategoryClick}
            />
          </aside>

          {/* Blog Posts Section */}
          <section className="md:col-span-4">
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-white placeholder-balck  dark:bg-gray-800 rounded-md shadow-xl focus:outline-none text-black focus:ring-2 focus:ring-gray-500 dark:focus:ring-customBlue"
              />
            </div>

            {/* Blog Post Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <div
                    key={post.slug.current} // Use slug as key for uniqueness
                    className="transition-transform duration-300 rounded-md shadow-lg hover:scale-105"
                  >
                    <BlogPost
                      slug={post.slug.current}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.categories.map((cat) => cat.title).join(', ')}
                      date={new Date(post.publishedAt).toLocaleDateString()}
                      author={post.authorName}
                      imageUrl={post.mainImage.asset.url}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No posts found.</p>
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
