"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import InquiryList from "@/components/dashboard/inquiry-list";
import { createClient } from "../../../../supabase/client";
import {
  Loader2,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define a flexible interface for our database data
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  created_at: string;
  updated_at?: string;
  service_type?: string;
  urgency?: "low" | "medium" | "high";
}

// Type for what InquiryList expects (with required fields)
type InquiryListItem = ContactInquiry & {
  service_type: string;
  urgency: "low" | "medium" | "high";
};

type InquiryListProps = {
  service_type: string;
  urgency: "low" | "medium" | "high";
  [key: string]: any;
};

interface InquiryStats {
  totalInquiries: number;
  newInquiries: number;
  inProgressInquiries: number;
  resolvedInquiries: number;
  todayInquiries: number;
  responseRate: number;
}

export default function InquiriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    totalInquiries: 0,
    newInquiries: 0,
    inProgressInquiries: 0,
    resolvedInquiries: 0,
    todayInquiries: 0,
    responseRate: 0,
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
            fetchInquiriesData();
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

  // Fetch inquiries and calculate stats
  const fetchInquiriesData = async () => {
    try {
      const supabase = createClient();

      const { data: inquiriesData, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching inquiries:", error);
        return;
      }

      // Set the inquiries data as-is from the database
      setInquiries(inquiriesData || []);

      // Calculate stats
      const totalInquiries = inquiriesData?.length || 0;
      const newInquiries =
        inquiriesData?.filter((i) => i.status === "new").length || 0;
      const inProgressInquiries =
        inquiriesData?.filter((i) => i.status === "in_progress").length || 0;
      const resolvedInquiries =
        inquiriesData?.filter((i) => i.status === "resolved").length || 0;

      // Today's inquiries
      const today = new Date().toDateString();
      const todayInquiries =
        inquiriesData?.filter(
          (i) => new Date(i.created_at).toDateString() === today
        ).length || 0;

      // Response rate
      const responseRate =
        totalInquiries > 0
          ? Math.round(((totalInquiries - newInquiries) / totalInquiries) * 100)
          : 0;

      setStats({
        totalInquiries,
        newInquiries,
        inProgressInquiries,
        resolvedInquiries,
        todayInquiries,
        responseRate,
      });
    } catch (error) {
      console.error("Error fetching inquiries data:", error);
    }
  };

  // Transform inquiries for InquiryList component
  const transformInquiriesForList = (
    inquiries: ContactInquiry[]
  ): InquiryListItem[] => {
    return inquiries.map((inquiry) => ({
      ...inquiry,
      service_type: inquiry.service_type || "General Inquiry",
      urgency: inquiry.urgency || "medium",
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading inquiries...</p>
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
                  Customer Inquiries
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage and respond to customer inquiries and quote requests.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {stats.todayInquiries} today
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stats.responseRate}% response rate
                </Badge>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow bg-white">
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
                <p className="text-xs text-gray-500 mt-1">All time inquiries</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  New Inquiries
                </CardTitle>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.newInquiries}
                </div>
                <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  In Progress
                </CardTitle>
                <Clock className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.inProgressInquiries}
                </div>
                <p className="text-xs text-gray-500 mt-1">Being handled</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Resolved
                </CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.resolvedInquiries}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Successfully closed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Priority Alerts */}
          {stats.newInquiries > 0 && (
            <Card className="mb-8 border-l-4 border-l-red-500 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Action Required</span>
                </CardTitle>
                <CardDescription className="text-red-700">
                  You have {stats.newInquiries} new inquiries that need your
                  attention.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Inquiries List */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>All Inquiries</span>
              </CardTitle>
              <CardDescription>
                Manage customer inquiries by status and respond to questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InquiryList initialInquiries={inquiries as any} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
