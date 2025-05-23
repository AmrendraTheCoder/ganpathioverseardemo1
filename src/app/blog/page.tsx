import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/server";
import BlogList from "@/components/blog/blog-list";
import { Metadata } from "next";
import { Search, BookOpen, TrendingUp, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Ganpathi Overseas | Printing Industry Insights",
  description:
    "Latest news, tips, and insights from Ganpathi Overseas printing services. Learn about printing techniques, industry trends, and best practices.",
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

  // Get categories for stats
  const categories = posts
    ? Array.from(new Set(posts.map((post) => post.category)))
    : [];
  const totalPosts = posts?.length || 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the latest insights, tips, and trends in the printing
              industry. From technical guides to industry news, we share our
              expertise.
            </p>

            {/* Blog Stats */}
            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {totalPosts}
                </div>
                <div className="text-sm">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {categories.length}
                </div>
                <div className="text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="w-32 h-32 border border-white rounded-full"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <div className="w-24 h-24 border border-white rounded-full"></div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Topics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our articles by category to find exactly what you're
              looking for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Printing Techniques
              </h3>
              <p className="text-gray-600 mb-4">
                Learn about different printing methods, from offset to digital
                printing.
              </p>
              <div className="text-blue-600 font-medium">
                {posts?.filter(
                  (post) => post.category === "Printing Techniques"
                ).length || 0}{" "}
                articles
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Industry News
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest trends and developments in
                printing.
              </p>
              <div className="text-green-600 font-medium">
                {posts?.filter((post) => post.category === "Industry News")
                  .length || 0}{" "}
                articles
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Tips & Guides
              </h3>
              <p className="text-gray-600 mb-4">
                Practical advice and best practices for your printing projects.
              </p>
              <div className="text-purple-600 font-medium">
                {posts?.filter((post) => post.category === "Tips & Guides")
                  .length || 0}{" "}
                articles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Blog Posts Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working on creating amazing content for you. Check back
                soon for our latest articles and insights!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest printing tips, industry news, and exclusive insights
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-8 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
