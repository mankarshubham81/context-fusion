"use client";

import React, { useMemo, useState } from "react";
import { BlogPostData, Category } from "@/app/types";
import { FaSearch } from "react-icons/fa";
import dynamic from "next/dynamic";
import BlogPost from "@/components/BlogPost";
import CategoryList from "@/components/CategoryList";

const Pagination = dynamic(() => import("@/components/Pagination"), { ssr: false });

interface BlogPageProps {
  posts: BlogPostData[];
  categories: Category[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    let updatedPosts = selectedCategory === "All"
      ? posts
      : posts.filter((post) =>
          post.categories.some((cat: Category) => cat.title === selectedCategory)
        );

    if (searchTerm.trim()) {
      updatedPosts = updatedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return updatedPosts;
  }, [selectedCategory, searchTerm, posts]);

  const paginatedPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-screen-xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search blog posts"
            value={searchTerm}
            onChange={handleSearch}
            className="border-b-2 border-gray-300 focus:border-gray-500 outline-none text-lg"
            aria-label="Search blog posts"
          />
        </div>
      </div>

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post: BlogPostData) => (
            <div
              key={post.slug.current}
              className="rounded-md shadow-lg hover:[filter:drop-shadow(0_0_1em_#7C3AED)]"
            >
              <BlogPost
                slug={post.slug.current}
                title={post.title}
                excerpt={post.excerpt}
                category={post.categories.map((cat: Category) => cat.title).join(", ")}
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

      {filteredPosts.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPosts.length}
          itemsPerPage={postsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default BlogPage;
