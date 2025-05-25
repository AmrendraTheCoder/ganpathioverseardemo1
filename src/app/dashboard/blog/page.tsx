"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/client";
import AdvancedBlogEditor from "../../../components/blog/advanced-blog-editor"; // Adjust path as needed

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
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Target,
  Award,
  Clock,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Tag,
  BookOpen,
  Zap,
  Globe,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Enhanced interfaces
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
  view_count: number | null;
  like_count: number | null;
  comment_count: number | null;
  share_count: number | null;
}

interface SEOAnalytics {
  organic_clicks: number;
  impressions: number;
  avg_position: number;
  click_through_rate: number;
  keywords_ranking: any;
}

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  avgSeoScore: number;
  avgReadingTime: number;
  topPerformingPost: BlogPost | null;
  recentActivity: any[];
  viewsThisWeek: number;
  engagementRate: number;
  organicTraffic: number;
  totalImpressions: number;
  avgClickThrough: number;
  keywordRankings: number;
}

export default function BlogManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    avgSeoScore: 0,
    avgReadingTime: 0,
    topPerformingPost: null,
    recentActivity: [],
    viewsThisWeek: 0,
    engagementRate: 0,
    organicTraffic: 0,
    totalImpressions: 0,
    avgClickThrough: 0,
    keywordRankings: 0,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  const router = useRouter();

  const handleSavePost = (post: any): void => {
    // Handle saving the post
    setPosts((prev) => [...prev, post]);
    setShowEditor(false);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };
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

  // Fetch comprehensive blog data with SEO analytics
  const fetchBlogData = async () => {
    try {
      const supabase = createClient();

      // Fetch blog posts with all SEO data
      const { data: blogPosts, error: postsError } = await supabase
        .from("blog_posts")
        .select(
          `
          id, title, slug, excerpt, content, cover_image, author, category,
          created_at, updated_at, meta_title, meta_description, meta_keywords,
          focus_keyword, seo_score, reading_time, word_count, featured, status,
          publish_date, tags, view_count, like_count, comment_count, share_count
        `
        )
        .order("created_at", { ascending: false })
        .returns<BlogPost[]>();

      if (postsError) {
        console.error("Error fetching blog posts:", postsError);
        return;
      }

      setPosts(blogPosts || []);
      setFilteredPosts(blogPosts || []);

      // Calculate comprehensive stats
      const totalPosts = blogPosts?.length || 0;
      const publishedPosts =
        blogPosts?.filter((p) => p.status === "published").length || 0;
      const draftPosts =
        blogPosts?.filter((p) => p.status === "draft").length || 0;
      const scheduledPosts =
        blogPosts?.filter((p) => p.status === "scheduled").length || 0;

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

      // SEO metrics
      const avgSeoScore =
        blogPosts?.reduce((sum, post) => sum + (post.seo_score || 0), 0) /
          totalPosts || 0;
      const avgReadingTime =
        blogPosts?.reduce((sum, post) => sum + (post.reading_time || 0), 0) /
          totalPosts || 0;

      // Find top performing post
      const topPerformingPost = blogPosts?.reduce(
        (top, post) => {
          const postScore =
            (post.view_count || 0) +
            (post.like_count || 0) * 2 +
            (post.comment_count || 0) * 3;
          const topScore = top
            ? (top.view_count || 0) +
              (top.like_count || 0) * 2 +
              (top.comment_count || 0) * 3
            : 0;
          return postScore > topScore ? post : top;
        },
        null as BlogPost | null
      );

      // Get SEO analytics
      const { data: seoData } = await supabase
        .from("seo_analytics")
        .select("*")
        .gte(
          "date",
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        );

      const organicTraffic =
        seoData?.reduce((sum, item) => sum + (item.organic_clicks || 0), 0) ||
        0;
      const totalImpressions =
        seoData?.reduce((sum, item) => sum + (item.impressions || 0), 0) || 0;
      const avgClickThrough =
        totalImpressions > 0 ? (organicTraffic / totalImpressions) * 100 : 0;

      // Get recent activity
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { count: viewsThisWeek } = await supabase
        .from("blog_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", oneWeekAgo.toISOString());

      // Calculate engagement rate
      const engagementActions = totalLikes + totalComments + totalShares;
      const engagementRate =
        totalViews > 0 ? Math.round((engagementActions / totalViews) * 100) : 0;

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        scheduledPosts,
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        avgSeoScore: Math.round(avgSeoScore),
        avgReadingTime: Math.round(avgReadingTime),
        topPerformingPost,
        recentActivity: [],
        viewsThisWeek: viewsThisWeek || 0,
        engagementRate,
        organicTraffic,
        totalImpressions,
        avgClickThrough: Math.round(avgClickThrough * 100) / 100,
        keywordRankings: 0,
      });
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.meta_keywords &&
            post.meta_keywords.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((post) => post.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof BlogPost] || 0;
      const bValue = b[sortBy as keyof BlogPost] || 0;

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, statusFilter, categoryFilter, sortBy, sortOrder]);

  // Get unique categories
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Bulk actions
  const handleBulkAction = async (action: string) => {
    if (selectedPosts.length === 0) {
      toast.error("Please select posts first");
      return;
    }

    const supabase = createClient();

    try {
      switch (action) {
        case "delete":
          const { error: deleteError } = await supabase
            .from("blog_posts")
            .delete()
            .in("id", selectedPosts);

          if (deleteError) throw deleteError;
          toast.success(`Deleted ${selectedPosts.length} posts`);
          break;

        case "publish":
          const { error: publishError } = await supabase
            .from("blog_posts")
            .update({
              status: "published",
              publish_date: new Date().toISOString(),
            })
            .in("id", selectedPosts);

          if (publishError) throw publishError;
          toast.success(`Published ${selectedPosts.length} posts`);
          break;

        case "draft":
          const { error: draftError } = await supabase
            .from("blog_posts")
            .update({ status: "draft" })
            .in("id", selectedPosts);

          if (draftError) throw draftError;
          toast.success(`Moved ${selectedPosts.length} posts to draft`);
          break;

        case "feature":
          const { error: featureError } = await supabase
            .from("blog_posts")
            .update({ featured: true })
            .in("id", selectedPosts);

          if (featureError) throw featureError;
          toast.success(`Featured ${selectedPosts.length} posts`);
          break;
      }

      setSelectedPosts([]);
      fetchBlogData();
    } catch (error) {
      console.error("Bulk action error:", error);
      toast.error("Failed to perform bulk action");
    }
  };

  // Export data
  const handleExport = () => {
    const csvContent = [
      // Header
      [
        "Title",
        "Author",
        "Category",
        "Status",
        "Views",
        "Likes",
        "Comments",
        "SEO Score",
        "Created At",
      ].join(","),
      // Data
      ...filteredPosts.map((post) =>
        [
          `"${post.title}"`,
          post.author,
          post.category,
          post.status,
          post.view_count || 0,
          post.like_count || 0,
          post.comment_count || 0,
          post.seo_score || 0,
          new Date(post.created_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-posts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get SEO score color
  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          {/* Enhanced Header Section */}
          <header className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  SEO Blog Management
                </h1>
                <p className="text-gray-600 text-lg">
                  Comprehensive blog analytics with SEO insights and performance
                  tracking.
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
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="hidden md:flex"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-900 hover:bg-blue-800">
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Blog Post</DialogTitle>
                      <DialogDescription>
                        Create an SEO-optimized blog post with advanced editing
                        features.
                      </DialogDescription>
                    </DialogHeader>
                    {/* Blog editor will be implemented separately */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-800">
                        Advanced blog editor coming soon with:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-blue-700 text-sm">
                        <li>Rich text editor with SEO suggestions</li>
                        <li>Real-time SEO score calculator</li>
                        <li>Advanced image uploader with optimization</li>
                        <li>Automatic meta tags generation</li>
                        <li>Content scheduling and workflow</li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  className="bg-blue-900 hover:bg-blue-800"
                  onClick={() => setShowEditor(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>

                {/* Conditionally render the editor */}
                {showEditor && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
                    <AdvancedBlogEditor
                      onSave={handleSavePost}
                      onClose={handleCloseEditor}
                    />
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Enhanced Analytics Overview */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="seo">SEO Analytics</TabsTrigger>
              <TabsTrigger value="content">Content Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Posts */}
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
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
                    <p className="text-xs text-gray-500 mt-1">
                      {stats.publishedPosts} published, {stats.draftPosts}{" "}
                      drafts
                    </p>
                  </CardContent>
                </Card>

                {/* Total Views */}
                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Views
                    </CardTitle>
                    <Eye className="h-5 w-5 text-green-500" />
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

                {/* Engagement Rate */}
                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Engagement
                    </CardTitle>
                    <Heart className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.engagementRate}%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {stats.totalLikes +
                        stats.totalComments +
                        stats.totalShares}{" "}
                      total interactions
                    </p>
                  </CardContent>
                </Card>

                {/* Average SEO Score */}
                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Avg SEO Score
                    </CardTitle>
                    <Target className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.avgSeoScore}/100
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${stats.avgSeoScore}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Organic Traffic */}
                <Card className="border-l-4 border-l-emerald-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Organic Traffic
                    </CardTitle>
                    <Globe className="h-5 w-5 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.organicTraffic.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                  </CardContent>
                </Card>

                {/* Total Impressions */}
                <Card className="border-l-4 border-l-cyan-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Impressions
                    </CardTitle>
                    <BarChart3 className="h-5 w-5 text-cyan-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.totalImpressions.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Search results</p>
                  </CardContent>
                </Card>

                {/* Click Through Rate */}
                <Card className="border-l-4 border-l-indigo-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      CTR
                    </CardTitle>
                    <Zap className="h-5 w-5 text-indigo-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.avgClickThrough}%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Click-through rate
                    </p>
                  </CardContent>
                </Card>

                {/* Reading Time */}
                <Card className="border-l-4 border-l-pink-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Avg Read Time
                    </CardTitle>
                    <Clock className="h-5 w-5 text-pink-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.avgReadingTime}min
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Average per post
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              {/* Top Performing Post */}
              {stats.topPerformingPost && (
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Top Performing Post
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-3 text-blue-900">
                      {stats.topPerformingPost.title}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                        <Target className="w-4 h-4 mr-2 text-orange-600" />
                        <span>
                          SEO: {stats.topPerformingPost.seo_score || 0}/100
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Enhanced Filter and Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search posts, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>

                {/* Category Filter */}
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Date Created</SelectItem>
                      <SelectItem value="updated_at">Last Updated</SelectItem>
                      <SelectItem value="view_count">Views</SelectItem>
                      <SelectItem value="seo_score">SEO Score</SelectItem>
                      <SelectItem value="like_count">Likes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </Button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedPosts.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">
                    {selectedPosts.length} posts selected
                  </span>
                  <div className="flex gap-2 ml-auto">
                    <Button
                      size="sm"
                      onClick={() => handleBulkAction("publish")}
                    >
                      Publish
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("draft")}
                    >
                      Draft
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("feature")}
                    >
                      Feature
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleBulkAction("delete")}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Blog Posts ({filteredPosts.length})
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPosts([])}
                >
                  Clear Selection
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPosts(filteredPosts.map((p) => p.id));
                            } else {
                              setSelectedPosts([]);
                            }
                          }}
                          checked={
                            selectedPosts.length === filteredPosts.length &&
                            filteredPosts.length > 0
                          }
                        />
                      </th>
                      <th className="text-left p-2">Title</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">SEO Score</th>
                      <th className="text-left p-2">Performance</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={selectedPosts.includes(post.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPosts([...selectedPosts, post.id]);
                              } else {
                                setSelectedPosts(
                                  selectedPosts.filter((id) => id !== post.id)
                                );
                              }
                            }}
                          />
                        </td>
                        <td className="p-2">
                          <div>
                            <div className="font-medium text-gray-900 line-clamp-1">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {post.excerpt}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              {post.featured && (
                                <Badge className="text-xs bg-yellow-100 text-yellow-800">
                                  Featured
                                </Badge>
                              )}
                              {post.focus_keyword && (
                                <Badge variant="outline" className="text-xs">
                                  <Target className="w-3 h-3 mr-1" />
                                  {post.focus_keyword}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge
                            className={
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : post.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {post.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium ${getSeoScoreColor(post.seo_score || 0)}`}
                            >
                              {post.seo_score || 0}/100
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${post.seo_score || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center text-gray-600">
                              <Eye className="w-3 h-3 mr-1" />
                              {post.view_count || 0}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Heart className="w-3 h-3 mr-1" />
                                {post.like_count || 0}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                {post.comment_count || 0}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-sm text-gray-600">
                          {formatDate(post.created_at)}
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" className="p-1">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="p-1">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="p-1">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    No posts found matching your criteria
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
