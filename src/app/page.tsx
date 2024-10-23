// src/app/page.tsx (Server Component)

import { client as sanityClient } from "../sanity/lib/client";
import { BlogPostData, Category } from "../app/types";
import { postsQuery, categoriesQuery } from "@/sanity/lib/queries";
import BlogPage from "@/components/BlogPage"; // Client Component
import About from "@/components/About";

// Server-side function to fetch data
async function getData() {
  try {
    const posts: BlogPostData[] = await sanityClient.fetch(postsQuery);
    const categories: Category[] = await sanityClient.fetch(categoriesQuery);
    return { posts, categories };
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return { posts: [], categories: [] };
  }
}

// This is the Server Component
export default async function Home() {
  // Fetch data on the server
  const { posts, categories } = await getData();

  return (
    <div>
      {/* Pass fetched data to the client component */}
      <About/>
      <BlogPage posts={posts} categories={categories} />
    </div>
  );
}
