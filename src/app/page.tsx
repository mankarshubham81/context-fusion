"use client";
import { useEffect, useState } from 'react';
import { client as sanityClient } from '../sanity/lib/client';
import { BlogPostData, Category } from '../app/types';
import { FaSearch } from 'react-icons/fa';
import BlogPost from '../components/BlogPost';
import CategoryList from '../components/CategoryList';
import Pagination from '../components/Pagination';
import About from './about/page';
import { postsQuery } from '@/sanity/lib/queries';
import { categoriesQuery } from '@/sanity/lib/queries';


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostData[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPostData[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4; // Number of posts per page

  // Fetch posts and categories from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: BlogPostData[] = await sanityClient.fetch(postsQuery);
        const allCategoriesData: Category[] = await sanityClient.fetch(categoriesQuery);
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
      <main className="left-[calc(-50vw+50%)] relative overflow-hidden sm:mx-1 md:mx-1 py-2 px-2 sm:p-4">
        <About />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-4">
          <aside className="md:col-span-2 sm:col-span-1">
            <CategoryList
              categories={allCategories}
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
            />
          </aside>

          <section className="md:col-span-4">
            <div className="relative">
              <div className="mb-4 flex items-center">
                <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder={`Search blog posts...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-3 bg-white placeholder-black dark:placeholder-white dark:bg-gray-800 rounded-md shadow-xl focus:outline-none dark:text-gray-200 text-black focus:ring-2 focus:ring-customBlue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <div
                    key={post.slug.current}
                    className="transition-transform duration-300 rounded-md shadow-lg hover:scale-105"
                  >
                    <BlogPost
                      slug={post.slug.current}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.categories.map((cat) => cat.title).join(', ')}
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

export default Home;
