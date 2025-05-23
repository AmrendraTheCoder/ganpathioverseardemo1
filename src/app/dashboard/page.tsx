import DashboardNavbar from "@/components/dashboard-navbar";
import {
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  let stats = {
    totalInquiries: 0,
    newInquiries: 0,
    totalBlogPosts: 0,
    recentInquiries: [],
  };

  try {
    const supabase = await createClient();

    // Fetch dashboard statistics
    const [inquiriesResult, blogPostsResult] = await Promise.all([
      supabase.from("contact_inquiries").select("*", { count: "exact" }),
      supabase.from("blog_posts").select("*", { count: "exact" }),
    ]);

    stats.totalInquiries = inquiriesResult.count || 0;
    stats.totalBlogPosts = blogPostsResult.count || 0;

    // Count new inquiries
    stats.newInquiries =
      inquiriesResult.data?.filter((inquiry) => inquiry.status === "new")
        .length || 0;

    // Recent inquiries
    stats.recentInquiries = inquiriesResult.data?.slice(0, 5) || [];
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Continue with default stats if database is not available
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-gray-900">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Welcome back! Here's an overview of your business.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Inquiries
                </CardTitle>
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalInquiries}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Customer inquiries received
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  New Inquiries
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.newInquiries}
                </div>
                <p className="text-xs text-gray-500 mt-1">Pending responses</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Blog Posts
                </CardTitle>
                <FileText className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalBlogPosts}
                </div>
                <p className="text-xs text-gray-500 mt-1">Published articles</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Response Rate
                </CardTitle>
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalInquiries > 0
                    ? Math.round(
                        ((stats.totalInquiries - stats.newInquiries) /
                          stats.totalInquiries) *
                          100
                      )
                    : 0}
                  %
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Inquiries responded to
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Manage your business efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/dashboard/inquiries" className="block group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group-hover:shadow-md">
                    <MessageSquare className="h-10 w-10 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Manage Inquiries
                      </h3>
                      <p className="text-sm text-gray-600">
                        Respond to customer inquiries and quotes
                      </p>
                    </div>
                  </div>
                </Link>

                <Link href="/dashboard/blog" className="block group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group-hover:shadow-md">
                    <FileText className="h-10 w-10 text-green-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Manage Blog
                      </h3>
                      <p className="text-sm text-gray-600">
                        Create and edit blog posts
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>Recent Inquiries</span>
                </CardTitle>
                <CardDescription>Latest customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentInquiries.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No inquiries yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Customer inquiries will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats.recentInquiries.map((inquiry: any) => (
                      <div
                        key={inquiry.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 mb-1">
                            {inquiry.subject}
                          </h4>
                          <p className="text-xs text-gray-600">
                            From: {inquiry.name}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            inquiry.status === "new"
                              ? "bg-blue-100 text-blue-800"
                              : inquiry.status === "in_progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {inquiry.status.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                    <Link
                      href="/dashboard/inquiries"
                      className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      View all inquiries →
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">System Status</CardTitle>
              <CardDescription className="text-blue-700">
                Everything is running smoothly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-900">
                    All systems operational
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  Last checked: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
