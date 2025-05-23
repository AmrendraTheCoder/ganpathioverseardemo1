import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

export default function DashboardStoryboard() {
  // Sample data
  const stats = {
    totalInquiries: 45,
    newInquiries: 8,
    totalBlogPosts: 12,
    responseRate: 82,
  };

  const recentInquiries = [
    {
      id: "1",
      subject: "Bulk Printing Quote Request",
      name: "John Smith",
      status: "new",
    },
    {
      id: "2",
      subject: "Wedding Invitation Design",
      name: "Sarah Johnson",
      status: "in_progress",
    },
    {
      id: "3",
      subject: "Business Card Printing",
      name: "Mike Wilson",
      status: "resolved",
    },
    {
      id: "4",
      subject: "Large Format Banner",
      name: "Lisa Brown",
      status: "new",
    },
    {
      id: "5",
      subject: "Book Publishing Inquiry",
      name: "David Lee",
      status: "resolved",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                <div className="text-2xl font-bold">{stats.totalInquiries}</div>
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
                <div className="text-2xl font-bold">{stats.newInquiries}</div>
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
                <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
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
                <div className="text-2xl font-bold">{stats.responseRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Inquiries responded to
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions and Recent Inquiries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your business efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <MessageSquare className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Manage Inquiries</h3>
                    <p className="text-sm text-gray-600">
                      Respond to customer inquiries and quotes
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <FileText className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Manage Blog</h3>
                    <p className="text-sm text-gray-600">
                      Create and edit blog posts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>Latest customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
