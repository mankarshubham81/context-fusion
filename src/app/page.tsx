"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';
import BlogPost from '../components/BlogPost';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Head from 'next/head';
import { client as sanityClient } from '../sanity/lib/client';
// import client from '../sanity'; // Import the Sanity client


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
  slug: string;
};

// Define the blog post data type
interface BlogPostData {
  title: string;
  slug: { current: string };
  authorName: string;
  mainImage: MainImage;
  categories: Category[];  // Updated to use the correct Category type
  publishedAt: string;
  excerpt: string;
  readingTime: number;
  body?: string;
}

// type BlogPost = {
//   slug: { current: string };
//   title: string;
//   content: string;  // or the equivalent field in your Sanity schema
//   category: { title: string }[];
//   publishedAt: string;
//   author: { name: string };
//   mainImage: {
//     asset: { url: string };
//     alt: string;
//   };
// };


const categories = ["All", "Technology", "Lifestyle", "Business", "Travel", "Food", "Anime"];


// GROQ query to fetch the blog posts from Sanity
const query = `*[_type == "post"]{
  title,
  slug,
  "authorName": author->name,
  mainImage{
    asset->{url},
    alt
  },
  categories[]->{
    title
  },
  publishedAt,
  excerpt,
  readingTime
}`;

const categoriesQuery = `*[_type == "category"]{
  title,
  slug
}`;


// // Fetch all categories
// const getAllCategories = async (): Promise<Category[]> => {
//   const categories: Category[] = await sanityClient.fetch(categoriesQuery);
//   return categories;
// };

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPostData[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPostData[]>([]);
  const [allCategories, setAllCategories] = useState([]);
  const postsPerPage = 4; // 2x2 grid means 4 posts per page


  // Fetch posts from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityClient.fetch(query);
      const allCategoriesData: [] = await sanityClient.fetch(categoriesQuery);
      setAllPosts(data);
      setAllCategories(allCategoriesData);
      setFilteredPosts(data); // Initial load shows all posts
    };
    fetchData();
  }, []);

  // Function to filter posts by category and search term
  const filterPosts = () => {
    let updatedPosts = selectedCategory === 'All'
      ? allPosts
      : allPosts.filter((post) =>
          post.categories.some((cat: any) => cat.title === selectedCategory)
        );
    if (searchTerm.trim()) {
      updatedPosts = updatedPosts.filter((post) =>
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
  }, [searchTerm, selectedCategory, allPosts]);

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
    <div className="bg-black">
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
            <CategoryList categories={allCategories} onCategoryClick={handleCategoryClick} />
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
                className="w-full p-3 bg-gray-700 rounded-md shadow-sm focus:outline-none text-gray-100 focus:ring-2 focus:ring-customBlue"
              />
            </div>

            {/* Blog Post Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <div key={index} className="cursor-pointer bg-gray-900 transition-transform duration-300 hover:scale-105 rounded-md shadow-lg">
                    <BlogPost
                      slug={post.slug.current}
                      key={index}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.categories.map((cat: any) => cat.title).join(', ')}
                      date={new Date(post.publishedAt).toDateString()}
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
              <div className="mt-8 flex bg-gray-900 pb-5 rounded-md justify-center">
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
