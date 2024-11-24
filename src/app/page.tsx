import dynamic from "next/dynamic";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery, categoriesQuery } from "@/sanity/lib/queries";
import { BlogPostData, Category } from "@/app/types";
import About from "@/components/About";

// Dynamically import BlogPage
const BlogPage = dynamic(() => import("@/components/BlogPage"), {
  loading: () => <p>Loading posts...</p>,
  ssr: false, // Disable server-side rendering for this component
});

export default async function Home() {
  // Fetch latest data from Sanity CMS
  const { posts, categories } = await Promise.all([
    sanityFetch<BlogPostData[]>({ query: postsQuery, tag: "posts" }), // Explicit type
    sanityFetch<Category[]>({ query: categoriesQuery, tag: "categories" }), // Explicit type
  ]).then(([posts, categories]) => ({ posts, categories }));

  return (
    <main>
      {/* About Section */}
      <section style={{ minHeight: "100vh" }}>
        <About />
      </section>

      {/* BlogPage Section */}
      <section>
        <BlogPage posts={posts} categories={categories} />
      </section>
    </main>
  );
}
