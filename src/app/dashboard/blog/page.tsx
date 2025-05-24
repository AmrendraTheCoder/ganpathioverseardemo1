"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import BlogPostList from "@/components/dashboard/blog-post-list";
import { createClient } from "../../../../supabase/client";
import {
  Loader2,
  FileText,
  Plus,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Users,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define types
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  category: string;
  created_at: string;
  updated_at: string | null;
  view_count: number | null;
  like_count: number | null;
  comment_count: number | null;
  share_count: number | null;
}

interface BlogStats {
  totalPosts: number;
  publishedThisMonth: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  avgReadTime: number;
  topPerformingPost: BlogPost | null;
  recentActivity: RecentActivity[];
  viewsThisWeek: number;
  engagementRate: number;
}

interface RecentActivity {
  type: "view" | "like" | "comment" | "share";
  title: string;
  time: string;
  icon: any;
  description: string;
}

// Type for joined query results
interface ActivityWithPost {
  created_at: string;
  author_name?: string;
  platform?: string;
  blog_posts: {
    title: string;
  } | null;
}

export default function BlogManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    publishedThisMonth: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    avgReadTime: 0,
    topPerformingPost: null,
    recentActivity: [],
    viewsThisWeek: 0,
    engagementRate: 0,
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

  // Fetch comprehensive blog analytics
  const fetchBlogData = async () => {
    try {
      const supabase = createClient();

      // Fetch blog posts with analytics
      const { data: blogPosts, error: postsError } = await supabase
        .from("blog_posts")
        .select(
          `
          id,
          title,
          slug,
          excerpt,
          content,
          cover_image,
          author,
          category,
          created_at,
          updated_at,
          view_count,
          like_count,
          comment_count,
          share_count
        `
        )
        .order("created_at", { ascending: false })
        .returns<BlogPost[]>();

      if (postsError) {
        console.error("Error fetching blog posts:", postsError);
        return;
      }

      setPosts(blogPosts || []);

      // Calculate comprehensive stats
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

      // Aggregate analytics
      const totalViews =
        blogPosts?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0;
      const totalLikes =
        blogPosts?.reduce((sum, post) => sum + (post.like_count || 0), 0) || 0;
      const totalComments =
        blogPosts?.reduce((sum, post) => sum + (post.comment_count || 0), 0) ||
        0;
      const totalShares =
        blogPosts?.reduce((sum, post) => sum + (post.share_count || 0), 0) || 0;

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

      // Find top performing post
      const topPerformingPost = blogPosts?.reduce(
        (top, post) => {
          const postScore =
            (post.view_count || 0) +
            (post.like_count || 0) * 2 +
            (post.comment_count || 0) * 3;
          const topScore =
            (top?.view_count || 0) +
            (top?.like_count || 0) * 2 +
            (top?.comment_count || 0) * 3;
          return postScore > topScore ? post : top;
        },
        null as BlogPost | null
      );

      // Get recent activity from views and likes tables
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const [viewsData, likesData, commentsData, sharesData] =
        await Promise.all([
          supabase
            .from("blog_views")
            .select("created_at, blog_posts!inner(title)")
            .gte("created_at", oneWeekAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(10)
            .returns<ActivityWithPost[]>(),
          supabase
            .from("blog_likes")
            .select("created_at, blog_posts!inner(title)")
            .gte("created_at", oneWeekAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(5)
            .returns<ActivityWithPost[]>(),
          supabase
            .from("blog_comments")
            .select("created_at, author_name, blog_posts!inner(title)")
            .eq("status", "approved")
            .gte("created_at", oneWeekAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(5)
            .returns<ActivityWithPost[]>(),
          supabase
            .from("blog_shares")
            .select("created_at, platform, blog_posts!inner(title)")
            .gte("created_at", oneWeekAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(5)
            .returns<ActivityWithPost[]>(),
        ]);

      // Get views this week
      const { count: viewsThisWeek } = await supabase
        .from("blog_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", oneWeekAgo.toISOString());

      // Calculate engagement rate
      const engagementActions = totalLikes + totalComments + totalShares;
      const engagementRate =
        totalViews > 0 ? Math.round((engagementActions / totalViews) * 100) : 0;

      // Combine recent activity
      const recentActivity: RecentActivity[] = [
        ...(viewsData.data || []).map(
          (item): RecentActivity => ({
            type: "view" as const,
            title: item.blog_posts?.title || "Unknown Post",
            time: item.created_at,
            icon: Eye,
            description: "New page view",
          })
        ),
        ...(likesData.data || []).map(
          (item): RecentActivity => ({
            type: "like" as const,
            title: item.blog_posts?.title || "Unknown Post",
            time: item.created_at,
            icon: Heart,
            description: "Article liked",
          })
        ),
        ...(commentsData.data || []).map(
          (item): RecentActivity => ({
            type: "comment" as const,
            title: item.blog_posts?.title || "Unknown Post",
            time: item.created_at,
            icon: MessageCircle,
            description: `Comment by ${item.author_name || "Unknown"}`,
          })
        ),
        ...(sharesData.data || []).map(
          (item): RecentActivity => ({
            type: "share" as const,
            title: item.blog_posts?.title || "Unknown Post",
            time: item.created_at,
            icon: Share2,
            description: `Shared on ${item.platform || "Unknown platform"}`,
          })
        ),
      ]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 10);

      setStats({
        totalPosts,
        publishedThisMonth,
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        avgReadTime,
        topPerformingPost,
        recentActivity,
        viewsThisWeek: viewsThisWeek || 0,
        engagementRate,
      });
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  // Format time ago
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading blog analytics...</p>
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
                  Blog Analytics
                </h1>
                <p className="text-gray-600 text-lg">
                  Track engagement, views, and performance of your blog posts in
                  real-time.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Activity className="w-3 h-3 mr-1" />
                  Live Data
                </Badge>
                <Button className="bg-blue-900 hover:bg-blue-800 md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>
            </div>
          </header>

          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Views */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Views
                </CardTitle>
                <Eye className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  +{stats.viewsThisWeek} this week
                </p>
              </CardContent>
            </Card>

            {/* Total Likes */}
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Likes
                </CardTitle>
                <Heart className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalLikes.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.engagementRate}% engagement rate
                </p>
              </CardContent>
            </Card>

            {/* Total Comments */}
            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Comments
                </CardTitle>
                <MessageCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalComments}
                </div>
                <p className="text-xs text-gray-500 mt-1">Approved comments</p>
              </CardContent>
            </Card>

            {/* Total Posts */}
            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Published Posts
                </CardTitle>
                <FileText className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalPosts}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  +{stats.publishedThisMonth} this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Shares */}
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Shares
                </CardTitle>
                <Share2 className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalShares}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Social media & direct
                </p>
              </CardContent>
            </Card>

            {/* Average Read Time */}
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg. Read Time
                </CardTitle>
                <Calendar className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.avgReadTime}min
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated reading time
                </p>
              </CardContent>
            </Card>

            {/* Engagement Rate */}
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Engagement Rate
                </CardTitle>
                <BarChart3 className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.engagementRate}%
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Likes + Comments + Shares
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Post */}
          {stats.topPerformingPost && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Performing Post
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Your most engaging content this period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-3 text-blue-900">
                    {stats.topPerformingPost.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-blue-600" />
                      <span>
                        {stats.topPerformingPost.view_count || 0} views
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      <span>
                        {stats.topPerformingPost.like_count || 0} likes
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>
                        {stats.topPerformingPost.comment_count || 0} comments
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-4 h-4 mr-2 text-purple-600" />
                      <span>
                        {stats.topPerformingPost.share_count || 0} shares
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest interactions with your blog posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.recentActivity.length > 0 ? (
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {stats.recentActivity.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                          >
                            <div
                              className={`p-1.5 rounded-full ${
                                activity.type === "view"
                                  ? "bg-blue-100"
                                  : activity.type === "like"
                                    ? "bg-red-100"
                                    : activity.type === "comment"
                                      ? "bg-green-100"
                                      : "bg-purple-100"
                              }`}
                            >
                              <Icon
                                className={`w-3 h-3 ${
                                  activity.type === "view"
                                    ? "text-blue-600"
                                    : activity.type === "like"
                                      ? "text-red-500"
                                      : activity.type === "comment"
                                        ? "text-green-600"
                                        : "text-purple-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {activity.title}
                              </p>
                              <p className="text-xs text-gray-600">
                                {activity.description} •{" "}
                                {timeAgo(activity.time)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        No recent activity
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blog Posts Management */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Blog Posts Management</span>
              </CardTitle>
              <CardDescription>
                Manage all your published posts and track their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlogPostList
                initialPosts={posts.map((post) => ({
                  ...post,
                  cover_image: post.cover_image || "", // Convert null to empty string
                }))}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
