// src/app/page.tsx (Server Component)

import { client as sanityClient } from "../sanity/lib/client";
import { BlogPostData, Category } from "../app/types";
import { postsQuery, categoriesQuery } from "@/sanity/lib/queries";
import About from "@/components/About";
import dynamic from "next/dynamic";

// Dynamic import for BlogPage with suspense fallback
const BlogPage = dynamic(() => import("@/components/BlogPage"), {
  loading: () => <p>Loading posts...</p>, // Optional loading fallback
  ssr: false,
});

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

// Server Component
export default async function Home() {
  // Fetch data once and cache it (useful if data doesn't change often)
  const { posts, categories } = await getData();

  return (
    <main>
      {/* About component will render instantly */}
      <section style={{ minHeight: "100vh" }}> {/* Ensure it fills initial viewport */}
        <About />
      </section>

      {/* BlogPage component will load asynchronously */}
      <section>
        <BlogPage posts={posts} categories={categories} />
      </section>
    </main>
  );
}
