"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Tag,
  User,
  ArrowLeft,
  Moon,
  Sun,
  Share2,
  Bookmark,
  Clock,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    author: string;
    category: string;
    created_at: string;
    slug: string;
  };
}

export default function BlogPostClient({ post }: BlogPostProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate reading time
  useEffect(() => {
    const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const avgWordsPerMinute = 200;
    setReadingTime(Math.ceil(wordCount / avgWordsPerMinute));
  }, [post.content]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-3 z-40">
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        <Button
          onClick={handleShare}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Share2 className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => setIsBookmarked(!isBookmarked)}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          } ${isBookmarked ? "text-yellow-500" : ""}`}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
          />
        </Button>
      </div>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Navigation */}
          <Link
            href="/blog"
            className={`inline-flex items-center mb-8 hover:translate-x-1 transition-transform ${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-900 hover:text-blue-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              {/* Category Badge */}
              <div className="mb-6">
                <Badge
                  className={`${
                    isDarkMode
                      ? "bg-blue-900/20 text-blue-300 border-blue-800"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  } border px-3 py-1`}
                >
                  {post.category}
                </Badge>
              </div>

              {/* Title */}
              <h1
                className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p
                className={`text-xl mb-8 leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div
                className={`flex flex-wrap items-center gap-6 text-sm pb-8 border-b ${
                  isDarkMode
                    ? "text-gray-400 border-gray-700"
                    : "text-gray-500 border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(post.created_at)}</span>
                </div>

                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>By {post.author}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{readingTime} min read</span>
                </div>

                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>2.3k views</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="relative h-96 md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <article
              className={`prose prose-lg max-w-none ${
                isDarkMode
                  ? "prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-a:text-blue-400 prose-blockquote:text-gray-300 prose-blockquote:border-blue-500"
                  : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-blockquote:text-gray-600 prose-blockquote:border-blue-500"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Article Footer */}
            <footer
              className={`mt-16 pt-8 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Share this article:
                  </span>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className={
                      isDarkMode ? "border-gray-600 hover:bg-gray-800" : ""
                    }
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Tag
                    className={`w-4 h-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <Badge
                    variant="outline"
                    className={
                      isDarkMode ? "border-gray-600 text-gray-300" : ""
                    }
                  >
                    {post.category}
                  </Badge>
                </div>
              </div>
            </footer>

            {/* Author Bio Section */}
            <div
              className={`mt-12 p-8 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-gray-50 border border-gray-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {post.author}
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Expert in printing technologies with over 10 years of
                    experience in the industry. Passionate about sharing
                    knowledge and helping businesses achieve their printing
                    goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles Placeholder */}
            <div className="mt-16">
              <h3
                className={`text-2xl font-bold mb-8 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Related Articles
              </h3>
              <div
                className={`p-8 rounded-2xl text-center ${
                  isDarkMode
                    ? "bg-gray-800/30 border border-gray-700"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                  More related articles coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
