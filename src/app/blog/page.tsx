import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/server";
import BlogList from "@/components/blog/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Ganpathi Overseas",
  description:
    "Latest news and insights from Ganpathi Overseas printing services",
};

export default async function BlogPage() {
  const supabase = await createClient();

  // Fetch blog posts from Supabase
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
          <p className="text-gray-600 mb-8">
            Latest news and insights from Ganpathi Overseas
          </p>

          <BlogList posts={posts || []} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
