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
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function ProductionReadyDashboard() {
  // Enhanced sample data with realistic metrics
  const stats = {
    totalInquiries: 127,
    newInquiries: 23,
    totalBlogPosts: 18,
    responseRate: 89,
    avgResponseTime: "2.3 hours",
    customerSatisfaction: 4.8,
  };

  const recentInquiries = [
    {
      id: "1",
      subject: "Large Format Banner Printing",
      name: "Rajesh Kumar",
      status: "new",
      priority: "high",
      created: "2 hours ago",
    },
    {
      id: "2",
      subject: "Wedding Invitation Package",
      name: "Priya Sharma",
      status: "in_progress",
      priority: "medium",
      created: "5 hours ago",
    },
    {
      id: "3",
      subject: "Corporate Brochure Design",
      name: "Amit Patel",
      status: "resolved",
      priority: "low",
      created: "1 day ago",
    },
    {
      id: "4",
      subject: "Book Publishing Quote",
      name: "Sunita Gupta",
      status: "new",
      priority: "high",
      created: "3 hours ago",
    },
    {
      id: "5",
      subject: "Business Card Printing",
      name: "Vikram Singh",
      status: "resolved",
      priority: "medium",
      created: "2 days ago",
    },
  ];

  const recentActivity = [
    {
      action: "New inquiry received",
      details: "Large Format Banner Printing",
      time: "2 hours ago",
      type: "inquiry",
    },
    {
      action: "Blog post published",
      details: "Latest Printing Trends 2024",
      time: "1 day ago",
      type: "blog",
    },
    {
      action: "Inquiry resolved",
      details: "Corporate Brochure Design",
      time: "1 day ago",
      type: "resolved",
    },
    {
      action: "New customer registered",
      details: "Tech Solutions Pvt Ltd",
      time: "2 days ago",
      type: "customer",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Header */}
          <header className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gradient">
                  Production Dashboard
                </h1>
                <p className="text-gray-600">
                  Real-time business insights and management tools
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </header>

          {/* Enhanced Stats Grid */}
          <div className="dashboard-grid mb-8">
            <Card className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inquiries
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Inquiries
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.newInquiries}
                </div>
                <p className="text-xs text-blue-600">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Blog Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
                <p className="text-xs text-green-600">+3 this month</p>
              </CardContent>
            </Card>

            <Card className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.responseRate}%
                </div>
                <p className="text-xs text-green-600">Excellent performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Streamline your workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="quick-action-card">
                  <MessageSquare className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Manage Inquiries</h3>
                    <p className="text-sm text-gray-600">
                      {stats.newInquiries} pending responses
                    </p>
                  </div>
                </div>

                <div className="quick-action-card">
                  <FileText className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Content Management</h3>
                    <p className="text-sm text-gray-600">
                      Create and edit blog posts
                    </p>
                  </div>
                </div>

                <div className="quick-action-card">
                  <BarChart3 className="h-8 w-8 text-purple-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-gray-600">
                      View detailed reports
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Inquiries */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>
                  Latest customer requests with priority levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(inquiry.status)}
                        <div>
                          <h4 className="font-medium text-sm">
                            {inquiry.subject}
                          </h4>
                          <p className="text-xs text-gray-600">
                            From: {inquiry.name} • {inquiry.created}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(inquiry.priority)}`}
                        >
                          {inquiry.priority}
                        </span>
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
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View all inquiries →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates across your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "inquiry"
                          ? "bg-blue-500"
                          : activity.type === "blog"
                            ? "bg-green-500"
                            : activity.type === "resolved"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">
                        {activity.details}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
