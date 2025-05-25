"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Tag,
  User,
  Search,
  Grid,
  List,
  Mail,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  Activity,
  Target,
  Clock,
  TrendingUp,
  Filter,
  BookOpen,
  Share2,
  Bookmark,
  ChevronDown,
  Star,
  Award,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../supabase/client";
import { toast } from "sonner";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  created_at: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  focus_keyword?: string;
  seo_score?: number;
  reading_time?: number;
  word_count?: number;
  featured?: boolean;
  status?: string;
  publish_date?: string;
  tags?: string[];
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
};

export default function BlogList({
  posts: initialPosts,
}: {
  posts: BlogPost[];
}) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("created_at");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const supabase = createClient();

  // Set up real-time subscriptions with enhanced data
  useEffect(() => {
    const channel = supabase
      .channel("enhanced_blog_posts_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          console.log("Enhanced blog post updated:", payload);

          if (payload.eventType === "UPDATE") {
            setPosts((prevPosts) =>
              prevPosts.map((post) => {
                if (post.id === payload.new.id) {
                  const updatedPost = { ...post, ...payload.new };

                  // Add visual feedback for real-time updates
                  setTimeout(() => {
                    const element = document.getElementById(`post-${post.id}`);
                    if (element) {
                      element.classList.add(
                        "animate-pulse",
                        "bg-green-50",
                        "ring-2",
                        "ring-green-200"
                      );
                      setTimeout(() => {
                        element.classList.remove(
                          "animate-pulse",
                          "bg-green-50",
                          "ring-2",
                          "ring-green-200"
                        );
                      }, 2000);
                    }
                  }, 100);

                  return updatedPost;
                }
                return post;
              })
            );
          } else if (payload.eventType === "INSERT") {
            setPosts((prevPosts) => [payload.new as BlogPost, ...prevPosts]);
            toast.success("New blog post published!");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Load bookmarked posts from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("bookmarked_posts") || "[]"
      );
      setBookmarkedPosts(bookmarks);
    }
  }, []);

  // Update posts when initialPosts change
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // Extract unique categories, tags, and authors
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  const authors = Array.from(new Set(posts.map((post) => post.author)));

  // Enhanced filtering and sorting
  const filteredPosts = posts
    .filter((post) => {
      // Only show published posts
      if (post.status !== "published") return false;

      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.meta_keywords &&
          post.meta_keywords
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (post.focus_keyword &&
          post.focus_keyword
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (post.tags &&
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesCategory = selectedCategory
        ? post.category === selectedCategory
        : true;
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;

      return matchesSearch && matchesCategory && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return (b.view_count || 0) - (a.view_count || 0);
        case "likes":
          return (b.like_count || 0) - (a.like_count || 0);
        case "seo_score":
          return (b.seo_score || 0) - (a.seo_score || 0);
        case "reading_time":
          return (b.reading_time || 0) - (a.reading_time || 0);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  // Get featured posts
  const featuredPosts = filteredPosts
    .filter((post) => post.featured)
    .slice(0, 3);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get SEO score color
  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-100 border-yellow-200";
    return "text-red-600 bg-red-100 border-red-200";
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("newsletter_subscriptions").insert([
        {
          email: email,
          source: "blog",
          status: "active",
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          toast.error("You are already subscribed to our newsletter!");
          return;
        }
        throw error;
      }

      setSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");

      setTimeout(() => {
        setShowSubscribeModal(false);
        setSubscribed(false);
        setEmail("");
      }, 2000);
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  // Toggle bookmark
  const toggleBookmark = (postId: string) => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("bookmarked_posts") || "[]"
      );

      if (bookmarks.includes(postId)) {
        const newBookmarks = bookmarks.filter((id: string) => id !== postId);
        localStorage.setItem("bookmarked_posts", JSON.stringify(newBookmarks));
        setBookmarkedPosts(newBookmarks);
        toast.success("Removed from bookmarks");
      } else {
        const newBookmarks = [...bookmarks, postId];
        localStorage.setItem("bookmarked_posts", JSON.stringify(newBookmarks));
        setBookmarkedPosts(newBookmarks);
        toast.success("Added to bookmarks");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Advanced Filters */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-blue-900">
              <BookOpen className="w-6 h-6 mr-2" />
              Discover Our Latest Insights
            </span>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              Live Updates
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-6">
            {/* Enhanced Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by title, keywords, author, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-lg p-1 border border-blue-200">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-blue-200">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Sort by
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("created_at")}>
                    Latest Posts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("views")}>
                    Most Viewed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("likes")}>
                    Most Liked
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("seo_score")}>
                    SEO Score
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("reading_time")}>
                    Reading Time
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("featured")}>
                    Featured First
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Subscribe Button */}
              <Button
                onClick={() => setShowSubscribeModal(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* Enhanced Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Category Filters */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Categories:
              </span>
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full text-xs"
              >
                All ({posts.length})
              </Button>
              {categories.map((category) => {
                const count = posts.filter(
                  (post) => post.category === category
                ).length;
                return (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full text-xs"
                  >
                    {category} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600">Tags:</span>
              <Button
                variant={!selectedTag ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full text-xs"
              >
                All Tags
              </Button>
              {allTags.slice(0, 8).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="rounded-full text-xs"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredPosts.length}</span>{" "}
            article{filteredPosts.length !== 1 ? "s" : ""} found
            {selectedCategory && (
              <span className="ml-2">
                in <Badge variant="secondary">{selectedCategory}</Badge>
              </span>
            )}
            {selectedTag && (
              <span className="ml-2">
                with tag <Badge variant="outline">#{selectedTag}</Badge>
              </span>
            )}
          </p>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {posts
                .reduce((sum, post) => sum + (post.view_count || 0), 0)
                .toLocaleString()}{" "}
              total views
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {posts.reduce(
                (sum, post) => sum + (post.like_count || 0),
                0
              )}{" "}
              likes
            </span>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || selectedTag || searchTerm) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
              setSelectedTag(null);
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 &&
        !selectedCategory &&
        !selectedTag &&
        !searchTerm && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-900">
                <Star className="w-5 h-5 mr-2" />
                Featured Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.id}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                      <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={
                            post.cover_image ||
                            "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
                        {post.title}
                      </h3>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-2">
                          <Eye className="w-3 h-3" />
                          <span>{post.view_count || 0}</span>
                          <Heart className="w-3 h-3" />
                          <span>{post.like_count || 0}</span>
                        </div>
                        {post.seo_score && (
                          <Badge
                            className={`text-xs ${getSeoScoreColor(post.seo_score)}`}
                          >
                            SEO: {post.seo_score}/100
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Main Posts Display */}
      {regularPosts.length === 0 && featuredPosts.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setSelectedTag(null);
                }}
              >
                Clear all filters
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {regularPosts.map((post) =>
            viewMode === "grid" ? (
              // Enhanced Grid View
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <article
                  id={`post-${post.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        post.cover_image ||
                        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"
                      }
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Enhanced Overlay Info */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      {/* SEO Score Badge */}
                      {post.seo_score && (
                        <Badge
                          className={`text-xs ${getSeoScoreColor(post.seo_score)}`}
                        >
                          SEO: {post.seo_score}
                        </Badge>
                      )}

                      {/* Bookmark Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-black/70 text-white hover:bg-black/80 p-1"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(post.id);
                        }}
                      >
                        <Bookmark
                          className={`w-3 h-3 ${bookmarkedPosts.includes(post.id) ? "fill-current" : ""}`}
                        />
                      </Button>
                    </div>

                    {/* Live Stats Overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3" />
                        <span>{post.view_count || 0}</span>
                        <Heart className="w-3 h-3" />
                        <span>{post.like_count || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta Information */}
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.created_at)}</span>
                      <span className="mx-2">•</span>
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                      {post.reading_time && (
                        <>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.reading_time} min</span>
                        </>
                      )}
                    </div>

                    {/* Enhanced Analytics Display */}
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center transition-all duration-300 hover:text-blue-600">
                        <Eye className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.view_count || 0} views
                        </span>
                      </div>
                      <div className="flex items-center transition-all duration-300 hover:text-red-600">
                        <Heart className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.like_count || 0} likes
                        </span>
                      </div>
                      <div className="flex items-center transition-all duration-300 hover:text-green-600">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.comment_count || 0} comments
                        </span>
                      </div>
                      <div className="flex items-center transition-all duration-300 hover:text-purple-600">
                        <Share2 className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {post.share_count || 0} shares
                        </span>
                      </div>
                    </div>

                    {/* Title and Excerpt */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Focus Keyword */}
                    {post.focus_keyword && (
                      <div className="mb-4">
                        <Badge
                          variant="outline"
                          className="text-xs text-blue-600 border-blue-200"
                        >
                          <Target className="w-3 h-3 mr-1" />
                          {post.focus_keyword}
                        </Badge>
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-900 font-medium">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                      {post.seo_score && (
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${getSeoScoreColor(post.seo_score)}`}
                        >
                          {post.seo_score}/100
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ) : (
              // Enhanced List View
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <article
                  id={`post-${post.id}`}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1"
                >
                  <div className="flex gap-6">
                    <div className="relative w-64 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={
                          post.cover_image ||
                          "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"
                        }
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.seo_score && (
                          <Badge
                            className={`text-xs ${getSeoScoreColor(post.seo_score)}`}
                          >
                            SEO: {post.seo_score}/100
                          </Badge>
                        )}
                        <div className="flex items-center text-sm text-gray-500 ml-auto">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(post.created_at)}</span>
                          <span className="mx-2">•</span>
                          <User className="w-4 h-4 mr-1" />
                          <span>{post.author}</span>
                          {post.reading_time && (
                            <>
                              <span className="mx-2">•</span>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{post.reading_time} min</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Real-Time Analytics Stats */}
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                        <div className="flex items-center transition-all duration-300 hover:text-blue-600">
                          <Eye className="w-3 h-3 mr-1" />
                          <span className="font-medium">
                            {post.view_count || 0} views
                          </span>
                        </div>
                        <div className="flex items-center transition-all duration-300 hover:text-red-600">
                          <Heart className="w-3 h-3 mr-1" />
                          <span className="font-medium">
                            {post.like_count || 0} likes
                          </span>
                        </div>
                        <div className="flex items-center transition-all duration-300 hover:text-green-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          <span className="font-medium">
                            {post.comment_count || 0} comments
                          </span>
                        </div>
                        <div className="flex items-center transition-all duration-300 hover:text-purple-600">
                          <Share2 className="w-3 h-3 mr-1" />
                          <span className="font-medium">
                            {post.share_count || 0} shares
                          </span>
                        </div>
                      </div>

                      {/* Title and Excerpt */}
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-900 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags and Keywords */}
                      <div className="flex items-center gap-2 mb-3">
                        {post.tags &&
                          post.tags.slice(0, 4).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        {post.focus_keyword && (
                          <Badge
                            variant="outline"
                            className="text-xs text-blue-600 border-blue-200"
                          >
                            <Target className="w-3 h-3 mr-1" />
                            {post.focus_keyword}
                          </Badge>
                        )}
                      </div>

                      {/* Action Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-blue-900 font-medium">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleBookmark(post.id);
                            }}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${bookmarkedPosts.includes(post.id) ? "fill-current text-yellow-500" : "text-gray-400"}`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )
          )}
        </div>
      )}

      {/* Newsletter Subscription Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
              <p className="text-gray-600">
                Subscribe to our newsletter and never miss our latest printing
                tips, SEO insights, and industry trends.
              </p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mb-4">
                  <p>By subscribing, you'll get:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Weekly SEO tips and insights</li>
                    <li>Latest printing industry trends</li>
                    <li>Exclusive content and guides</li>
                    <li>Early access to new posts</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSubscribeModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-900 hover:bg-blue-800"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-green-600 mb-2">
                  Successfully Subscribed!
                </h4>
                <p className="text-gray-600">
                  Thank you for subscribing to our newsletter. You'll receive
                  our next update soon!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO-Friendly Footer Section */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Explore More Content
            </h3>
            <p className="text-gray-600 mb-4">
              Discover our comprehensive library of printing insights, SEO tips,
              and industry expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
