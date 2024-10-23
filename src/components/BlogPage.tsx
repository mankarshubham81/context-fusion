// src/components/BlogPage.tsx (Client Component)

"use client"; // Ensure this is a Client Component

import { useMemo, useState } from "react";
import { BlogPostData, Category } from "../app/types";
import { FaSearch } from "react-icons/fa";
import dynamic from "next/dynamic";
import BlogPost from "../components/BlogPost";
import CategoryList from "../components/CategoryList";

// Dynamically import Pagination component to improve page load performance
const Pagination = dynamic(() => import("../components/Pagination"), { ssr: false });

interface BlogPageProps {
  posts: BlogPostData[];
  categories: Category[];
}

const BlogPage = ({ posts, categories }: BlogPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4; // Number of posts per page

  // Memoized filtering logic for posts
  const filteredPosts = useMemo(() => {
    let updatedPosts = selectedCategory === "All"
      ? posts
      : posts.filter((post) =>
          post.categories.some((cat: Category) => cat.title === selectedCategory)
        );

    if (searchTerm.trim()) {
      updatedPosts = updatedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return updatedPosts;
  }, [searchTerm, selectedCategory, posts]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className=" max-w-screen-2xl mx-auto my-16">
      <main className="relative overflow-hidden sm:mx-1 md:mx-1 py-2 px-2 sm:p-4">
        {/* Sidebar for categories */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 mt-4">
          <aside className="md:col-span-2 sm:col-span-1">
            <CategoryList
              categories={categories}
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
            />
          </aside>

          {/* Blog Posts Section */}
          <section className="md:col-span-4">
            {/* Search Bar */}
            <div className="relative mb-4 flex items-center">
              <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-3 bg-white placeholder-black dark:placeholder-white dark:bg-gray-800 rounded-md shadow-xl focus:outline-none dark:text-gray-200 text-black focus:ring-2 focus:ring-customBlue"
              />
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <div
                    key={post.slug.current}
                    className="rounded-md shadow-lg hover:[filter:drop-shadow(0_0_1em_#7C3AED)]"
                  >
                    <BlogPost
                      slug={post.slug.current}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.categories.map((cat) => cat.title).join(", ")}
                      date={post.publishedAt}
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
    </div>
  );
};

export default BlogPage;
