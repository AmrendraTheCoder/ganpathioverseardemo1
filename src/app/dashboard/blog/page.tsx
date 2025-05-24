"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import BlogPostList from "@/components/dashboard/blog-post-list";
import { createClient } from "../../../../supabase/client";
import { Loader2, FileText, Plus, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedThisMonth: 0,
    totalViews: 0,
    avgReadTime: 0,
  });
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const adminSession = localStorage.getItem("admin_session");
        const loginTime = localStorage.getItem("admin_login_time");

        if (adminSession === "true" && loginTime) {
          const now = Date.now();
          const sessionAge = now - parseInt(loginTime);
          const twentyFourHours = 24 * 60 * 60 * 1000;

          if (sessionAge < twentyFourHours) {
            setIsAuthenticated(true);
            fetchBlogData();
          } else {
            localStorage.removeItem("admin_session");
            localStorage.removeItem("admin_login_time");
            localStorage.removeItem("admin_username");
            router.push("/admin");
          }
        } else {
          router.push("/admin");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // Fetch blog posts and calculate stats
  const fetchBlogData = async () => {
    try {
      const supabase = createClient();

      const { data: blogPosts, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        return;
      }

      setPosts(blogPosts || []);

      // Calculate stats
      const totalPosts = blogPosts?.length || 0;
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const publishedThisMonth =
        blogPosts?.filter((post) => {
          const postDate = new Date(post.created_at);
          return (
            postDate.getMonth() === currentMonth &&
            postDate.getFullYear() === currentYear
          );
        }).length || 0;

      // Calculate average reading time
      const totalWords =
        blogPosts?.reduce((acc, post) => {
          const wordCount = post.content
            .replace(/<[^>]*>/g, "")
            .split(/\s+/).length;
          return acc + wordCount;
        }, 0) || 0;

      const avgReadTime =
        totalPosts > 0 ? Math.round(totalWords / totalPosts / 200) : 0;

      setStats({
        totalPosts,
        publishedThisMonth,
        totalViews: Math.floor(Math.random() * 10000) + 5000, // Mock data
        avgReadTime,
      });
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading blog management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Blog Management
                </h1>
                <p className="text-gray-600 text-lg">
                  Create, edit, and manage your blog posts to engage with
                  customers.
                </p>
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 md:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Posts
                </CardTitle>
                <FileText className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalPosts}
                </div>
                <p className="text-xs text-gray-500 mt-1">Published articles</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  This Month
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.publishedThisMonth}
                </div>
                <p className="text-xs text-gray-500 mt-1">Posts published</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Views
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">Article views</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg. Read Time
                </CardTitle>
                <FileText className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.avgReadTime}m
                </div>
                <p className="text-xs text-gray-500 mt-1">Minutes per post</p>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts List */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>All Blog Posts</span>
              </CardTitle>
              <CardDescription>
                Manage all your published and draft blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlogPostList initialPosts={posts} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
