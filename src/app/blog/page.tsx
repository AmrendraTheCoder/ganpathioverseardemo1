"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogList from "@/components/blog/blog-list";
import {
  Search,
  BookOpen,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Activity,
} from "lucide-react";
import { useRealtimeBlogAnalytics } from "../../../hooks/useRealtimeBlogAnalytics";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const { posts, analytics, isLoading } = useRealtimeBlogAnalytics();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  // Get categories for stats
  const categories = posts
    ? Array.from(new Set(posts.map((post) => post.category)))
    : [];

  // Get most popular posts
  const popularPosts =
    posts
      ?.sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
      .slice(0, 3) || [];

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

            {/* Real-Time Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-4">
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1 transition-all duration-500">
                  {isLoading ? "..." : analytics.totalPosts}
                </div>
                <div className="text-sm text-blue-200">Articles</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1 transition-all duration-500">
                  {isLoading ? "..." : analytics.totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-blue-200">Total Views</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1 transition-all duration-500">
                  {isLoading ? "..." : analytics.totalLikes}
                </div>
                <div className="text-sm text-blue-200">Likes</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1 transition-all duration-500">
                  {isLoading ? "..." : analytics.engagementRate}%
                </div>
                <div className="text-sm text-blue-200">Engagement</div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <Badge
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-all"
              >
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Live Analytics
              </Badge>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="w-32 h-32 border border-white rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <div className="w-24 h-24 border border-white rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Popular Posts Section */}
      {popularPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Popular Posts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most-read articles that readers love
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {popularPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative"
                >
                  {/* Ranking Badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  <div className="mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Real-Time Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center transition-all duration-300 hover:text-blue-600">
                        <Eye className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.view_count || 0}
                        </span>
                      </div>
                      <div className="flex items-center transition-all duration-300 hover:text-red-600">
                        <Heart className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.like_count || 0}
                        </span>
                      </div>
                      <div className="flex items-center transition-all duration-300 hover:text-green-600">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.comment_count || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors"
                  >
                    Read more →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Categories with Real-Time Stats */}
      <section className="py-16 bg-white">
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
            {/* Printing Techniques */}
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
              <div className="flex items-center justify-between">
                <div className="text-blue-600 font-medium">
                  {posts?.filter(
                    (post) => post.category === "Printing Techniques"
                  ).length || 0}{" "}
                  articles
                </div>
                {posts?.filter(
                  (post) => post.category === "Printing Techniques"
                ).length > 0 && (
                  <div className="text-sm text-gray-500 transition-all duration-300">
                    {posts
                      ?.filter(
                        (post) => post.category === "Printing Techniques"
                      )
                      .reduce(
                        (sum, post) => sum + (post.view_count || 0),
                        0
                      )}{" "}
                    views
                  </div>
                )}
              </div>
            </div>

            {/* Industry News */}
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
              <div className="flex items-center justify-between">
                <div className="text-green-600 font-medium">
                  {posts?.filter((post) => post.category === "Industry News")
                    .length || 0}{" "}
                  articles
                </div>
                {posts?.filter((post) => post.category === "Industry News")
                  .length > 0 && (
                  <div className="text-sm text-gray-500 transition-all duration-300">
                    {posts
                      ?.filter((post) => post.category === "Industry News")
                      .reduce(
                        (sum, post) => sum + (post.view_count || 0),
                        0
                      )}{" "}
                    views
                  </div>
                )}
              </div>
            </div>

            {/* Tips & Guides */}
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
              <div className="flex items-center justify-between">
                <div className="text-purple-600 font-medium">
                  {posts?.filter((post) => post.category === "Tips & Guides")
                    .length || 0}{" "}
                  articles
                </div>
                {posts?.filter((post) => post.category === "Tips & Guides")
                  .length > 0 && (
                  <div className="text-sm text-gray-500 transition-all duration-300">
                    {posts
                      ?.filter((post) => post.category === "Tips & Guides")
                      .reduce(
                        (sum, post) => sum + (post.view_count || 0),
                        0
                      )}{" "}
                    views
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts with Real-Time Data */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {isLoading ? "Loading Blog Posts..." : "No Blog Posts Yet"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {isLoading
                  ? "Please wait while we load your content..."
                  : "We're working on creating amazing content for you. Check back soon for our latest articles and insights!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Real-Time Analytics Summary */}
      {analytics.totalPosts > 0 && (
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Blog Community</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of printing professionals who read our insights
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
              <div className="transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold transition-all duration-500">
                  {analytics.totalViews.toLocaleString()}
                </div>
                <div className="text-blue-200">Total Reads</div>
              </div>
              <div className="transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold transition-all duration-500">
                  {analytics.totalLikes}
                </div>
                <div className="text-blue-200">Article Likes</div>
              </div>
              <div className="transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold transition-all duration-500">
                  {analytics.totalComments}
                </div>
                <div className="text-blue-200">Comments</div>
              </div>
              <div className="transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold transition-all duration-500">
                  {categories.length}
                </div>
                <div className="text-blue-200">Categories</div>
              </div>
            </div>

            {/* Live Activity Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-200">
                Live updates every 30 seconds
              </span>
            </div>
          </div>
        </section>
      )}

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
