import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  UserCircle,
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch dashboard statistics
  const [inquiriesResult, blogPostsResult] = await Promise.all([
    supabase.from("contact_inquiries").select("*", { count: "exact" }),
    supabase.from("blog_posts").select("*", { count: "exact" }),
  ]);

  const totalInquiries = inquiriesResult.count || 0;
  const totalBlogPosts = blogPostsResult.count || 0;

  // Count new inquiries
  const newInquiries =
    inquiriesResult.data?.filter((inquiry) => inquiry.status === "new")
      .length || 0;

  // Recent inquiries
  const recentInquiries = inquiriesResult.data?.slice(0, 5) || [];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's an overview of your business.
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inquiries
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInquiries}</div>
                <p className="text-xs text-muted-foreground">
                  Customer inquiries received
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Inquiries
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newInquiries}</div>
                <p className="text-xs text-muted-foreground">
                  Pending responses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Blog Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBlogPosts}</div>
                <p className="text-xs text-muted-foreground">
                  Published articles
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalInquiries > 0
                    ? Math.round(
                        ((totalInquiries - newInquiries) / totalInquiries) *
                          100,
                      )
                    : 0}
                  %
                </div>
                <p className="text-xs text-muted-foreground">
                  Inquiries responded to
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your business efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/dashboard/inquiries" className="block">
                  <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageSquare className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-medium">Manage Inquiries</h3>
                      <p className="text-sm text-gray-600">
                        Respond to customer inquiries and quotes
                      </p>
                    </div>
                  </div>
                </Link>

                <Link href="/dashboard/blog" className="block">
                  <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                      <h3 className="font-medium">Manage Blog</h3>
                      <p className="text-sm text-gray-600">
                        Create and edit blog posts
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>Latest customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {recentInquiries.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No inquiries yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentInquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-sm">
                            {inquiry.subject}
                          </h4>
                          <p className="text-xs text-gray-600">
                            From: {inquiry.name}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
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
                      className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View all inquiries →
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* User Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                User Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
                <p>
                  <span className="font-medium">Last Sign In:</span>{" "}
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
