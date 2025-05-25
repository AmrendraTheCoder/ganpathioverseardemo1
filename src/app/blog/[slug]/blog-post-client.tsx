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
  Heart,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogAnalytics } from "../../../../hooks/useBlogAnalytics";
import { createClient } from "../../../../supabase/client";
import { toast } from "sonner";

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
    view_count?: number;
    like_count?: number;
    comment_count?: number;
    relatedPosts: RelatedPost[];
  };
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  author: string;
  category: string;
  created_at: string;
  reading_time?: number;
}

interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  comment_text: string;
  created_at: string;
  status: string;
  parent_id?: string;
}

export default function BlogPostClient({ post }: BlogPostProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  const { scrollDepth, isLiked, likeCount, viewCount, toggleLike, trackShare } =
    useBlogAnalytics(post.id, post.slug);

  const supabase = createClient();

  // Real-time updates for this specific post
  useEffect(() => {
    const channel = supabase
      .channel(`blog_post_${post.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "blog_posts",
          filter: `id=eq.${post.id}`,
        },
        (payload) => {
          console.log("Post stats updated:", payload);
          // The analytics hook will handle the updates
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [post.id, supabase]);

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

  // Check if bookmarked
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("bookmarked_posts") || "[]"
      );
      setIsBookmarked(bookmarks.includes(post.id));
    }
  }, [post.id]);

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_comments")
          .select("*")
          .eq("blog_post_id", post.id)
          .eq("status", "approved")
          .order("created_at", { ascending: true });

        if (!error && data) {
          setComments(data);
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    loadComments();
  }, [post.id, supabase]);

  // Share functionality
  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    if (platform) {
      // Track the share
      trackShare(platform);

      let shareUrl = "";
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case "email":
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + url)}`;
          break;
      }

      if (shareUrl && platform !== "email") {
        window.open(shareUrl, "_blank", "width=600,height=400");
      } else if (platform === "email") {
        window.location.href = shareUrl;
      }
    } else {
      // Native share or copy to clipboard
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url });
          trackShare("native");
        } catch (error) {
          console.log("Error sharing:", error);
        }
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url);
        trackShare("copy");
        toast.success("Link copied to clipboard!");
      }
    }
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("bookmarked_posts") || "[]"
      );

      if (isBookmarked) {
        const newBookmarks = bookmarks.filter((id: string) => id !== post.id);
        localStorage.setItem("bookmarked_posts", JSON.stringify(newBookmarks));
        setIsBookmarked(false);
        toast.success("Removed from bookmarks");
      } else {
        const newBookmarks = [...bookmarks, post.id];
        localStorage.setItem("bookmarked_posts", JSON.stringify(newBookmarks));
        setIsBookmarked(true);
        toast.success("Added to bookmarks");
      }
    }
  };

  // Submit comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingComment(true);

    try {
      const { error } = await supabase.from("blog_comments").insert([
        {
          blog_post_id: post.id,
          slug: post.slug,
          author_name: commentForm.name,
          author_email: commentForm.email,
          comment_text: commentForm.comment,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("Comment submitted! It will appear after approval.");
      setCommentForm({ name: "", email: "", comment: "" });
      setShowCommentForm(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment. Please try again.");
    } finally {
      setSubmittingComment(false);
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
          style={{ width: `${scrollDepth}%` }}
        />
      </div>

      {/* Fixed Top Bar with Dark Mode Toggle */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-900/95 border-gray-700"
            : "bg-white/95 border-gray-200"
        } backdrop-blur-xl border-b`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Navigation */}
            <Link
              href="/blog"
              className={`inline-flex items-center hover:translate-x-1 transition-transform ${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-900 hover:text-blue-700"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to all posts</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                size="sm"
                variant="outline"
                className={`${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-100"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isDarkMode ? "Light" : "Dark"}
                </span>
              </Button>

              {/* Share Dropdown */}
              <div className="relative group">
                <Button
                  size="sm"
                  variant="outline"
                  className={
                    isDarkMode
                      ? "border-gray-600 hover:bg-gray-800 text-gray-100"
                      : ""
                  }
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                {/* Share Options */}
                <div
                  className={`absolute right-0 top-full mt-2 w-48 py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-200"
                  } border rounded-lg shadow-lg z-50`}
                >
                  <button
                    onClick={() => handleShare("twitter")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                      isDarkMode ? "hover:bg-gray-700 text-gray-100" : ""
                    }`}
                  >
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                      isDarkMode ? "hover:bg-gray-700 text-gray-100" : ""
                    }`}
                  >
                    Share on Facebook
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                      isDarkMode ? "hover:bg-gray-700 text-gray-100" : ""
                    }`}
                  >
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare("email")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                      isDarkMode ? "hover:bg-gray-700 text-gray-100" : ""
                    }`}
                  >
                    Share via Email
                  </button>
                  <button
                    onClick={() => handleShare()}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                      isDarkMode ? "hover:bg-gray-700 text-gray-100" : ""
                    }`}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons - Right Side */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-3 z-30">
        {/* Like Button */}
        <Button
          onClick={toggleLike}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg transition-all ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          } ${isLiked ? "text-red-500 border-red-300 hover:border-red-400" : ""}`}
          title={`${isLiked ? "Unlike" : "Like"} this article`}
        >
          <Heart
            className={`w-5 h-5 transition-all ${isLiked ? "fill-current scale-110" : ""}`}
          />
        </Button>

        {/* Bookmark Button */}
        <Button
          onClick={toggleBookmark}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          } ${isBookmarked ? "text-yellow-500 border-yellow-300" : ""}`}
          title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
          />
        </Button>

        {/* Comment Button */}
        <Button
          onClick={() => setShowCommentForm(!showCommentForm)}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
          title="Leave a comment"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>

        {/* Scroll to top button */}
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size="icon"
          variant="outline"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
          title="Scroll to top"
        >
          <ArrowLeft className="w-5 h-5 -rotate-90" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
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
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p
                className={`text-lg md:text-xl mb-8 leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div
                className={`flex flex-wrap items-center gap-4 md:gap-6 text-sm pb-8 border-b ${
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
                  <span>{viewCount.toLocaleString()} views</span>
                </div>

                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>{likeCount} likes</span>
                </div>

                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="relative h-64 md:h-96 lg:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
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
              className={`prose prose-base md:prose-lg lg:prose-xl max-w-none ${
                isDarkMode
                  ? "prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-a:text-blue-400 prose-blockquote:text-gray-300 prose-blockquote:border-blue-500"
                  : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-blockquote:text-gray-600 prose-blockquote:border-blue-500"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Engagement Section */}
            <div
              className={`mt-12 p-6 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-gray-50 border border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Button
                    onClick={toggleLike}
                    variant="outline"
                    className={`${isLiked ? "text-red-500 border-red-300" : ""} ${
                      isDarkMode ? "border-gray-600 hover:bg-gray-700" : ""
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                    />
                    {likeCount} Likes
                  </Button>

                  <Button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    variant="outline"
                    className={
                      isDarkMode ? "border-gray-600 hover:bg-gray-700" : ""
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {comments.length} Comments
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{viewCount.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Comment Form */}
            {showCommentForm && (
              <div
                className={`mt-8 p-6 rounded-2xl ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Leave a Comment
                </h3>
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={commentForm.name}
                        onChange={(e) =>
                          setCommentForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={commentForm.email}
                        onChange={(e) =>
                          setCommentForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Comment *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={commentForm.comment}
                      onChange={(e) =>
                        setCommentForm((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-600 text-gray-100"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Share your thoughts..."
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCommentForm(false)}
                      className={
                        isDarkMode ? "border-gray-600 hover:bg-gray-700" : ""
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submittingComment}
                      className="bg-blue-900 hover:bg-blue-800"
                    >
                      {submittingComment ? "Submitting..." : "Submit Comment"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Comments Section */}
            {comments.length > 0 && (
              <div className="mt-12">
                <h3
                  className={`text-2xl font-bold mb-8 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Comments ({comments.length})
                </h3>
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-6 rounded-2xl ${
                        isDarkMode
                          ? "bg-gray-800/30 border border-gray-700"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDarkMode ? "text-gray-100" : "text-gray-900"
                            }`}
                          >
                            {comment.author_name}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {comment.comment_text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Section */}
            <div
              className={`mt-16 p-6 md:p-8 rounded-2xl ${
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
          </div>
        </div>
      </div>
    </div>
  );
}
