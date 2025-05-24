"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Loader2,
  Clock,
  AlertCircle,
  MessageSquare,
  User,
  Building,
  Star,
  Send,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  service_type: string;
  urgency: string;
  created_at: string;
  response?: string;
};

export default function InquiryList({
  initialInquiries,
}: {
  initialInquiries: Inquiry[];
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [activeTab, setActiveTab] = useState<
    "all" | "new" | "in_progress" | "resolved"
  >("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const supabase = createClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("inquiry-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_inquiries",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          refreshInquiries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Refresh inquiries from database
  const refreshInquiries = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error refreshing inquiries:", error);
      toast.error("Failed to refresh inquiries");
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (activeTab === "all") return true;
    return inquiry.status === activeTab;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleStatusChange = async (
    id: string,
    status: "new" | "in_progress" | "resolved"
  ) => {
    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status } : inquiry
        )
      );

      toast.success(`Inquiry marked as ${status.replace("_", " ")}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update inquiry status");
    }
  };

  const handleSendResponse = async () => {
    if (!selectedInquiry || !response.trim()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({
          response,
          status: "resolved",
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedInquiry.id);

      if (error) throw error;

      // Update local state
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === selectedInquiry.id
            ? { ...inquiry, response, status: "resolved" }
            : inquiry
        )
      );

      toast.success("Response sent successfully!");
      setIsDialogOpen(false);
      setResponse("");
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to send response");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openResponseDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setResponse(inquiry.response || "");
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            New
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "low":
        return (
          <Badge variant="outline" className="text-green-600">
            Low Priority
          </Badge>
        );
      case "normal":
        return (
          <Badge variant="outline" className="text-blue-600">
            Normal
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="text-orange-600">
            Urgent
          </Badge>
        );
      case "critical":
        return (
          <Badge variant="outline" className="text-red-600">
            Critical
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInquiryCounts = () => {
    return {
      all: inquiries.length,
      new: inquiries.filter((i) => i.status === "new").length,
      in_progress: inquiries.filter((i) => i.status === "in_progress").length,
      resolved: inquiries.filter((i) => i.status === "resolved").length,
    };
  };

  const counts = getInquiryCounts();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">Customer Inquiries</h2>
          <Button
            onClick={refreshInquiries}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="new">
            New ({counts.new})
            {counts.new > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full ml-2 animate-pulse" />
            )}
          </TabsTrigger>
          <TabsTrigger value="in_progress">
            In Progress ({counts.in_progress})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({counts.resolved})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No inquiries found
              </h3>
              <p className="text-gray-500">
                {activeTab === "all"
                  ? "Customer inquiries will appear here when submitted."
                  : `No ${activeTab.replace("_", " ")} inquiries at the moment.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredInquiries.map((inquiry) => (
                <Card
                  key={inquiry.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-xl">
                            {inquiry.subject}
                          </CardTitle>
                          {getUrgencyBadge(inquiry.urgency)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(inquiry.created_at)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {getTimeAgo(inquiry.created_at)}
                          </div>
                          {inquiry.service_type && (
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {inquiry.service_type}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(inquiry.status)}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Customer Info */}
                      <div className="flex items-center space-x-6 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{inquiry.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {inquiry.email}
                          </a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a
                              href={`tel:${inquiry.phone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {inquiry.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Customer Message:
                        </h4>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border">
                          {inquiry.message}
                        </p>
                      </div>

                      {/* Response */}
                      {inquiry.response && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-medium mb-2 flex items-center text-green-800">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Your Response:
                          </h4>
                          <p className="text-green-700">{inquiry.response}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      {inquiry.status !== "new" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(inquiry.id, "new")}
                        >
                          Mark as New
                        </Button>
                      )}
                      {inquiry.status !== "in_progress" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(inquiry.id, "in_progress")
                          }
                        >
                          Mark In Progress
                        </Button>
                      )}
                      {inquiry.status !== "resolved" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(inquiry.id, "resolved")
                          }
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                    <Button
                      onClick={() => openResponseDialog(inquiry)}
                      className="bg-blue-900 hover:bg-blue-800"
                    >
                      {inquiry.response ? "Edit Response" : "Send Response"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Respond to Inquiry</DialogTitle>
            <DialogDescription>
              Send a response to {selectedInquiry?.name}'s inquiry about "
              {selectedInquiry?.subject}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Response</label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                rows={6}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSendResponse}
              disabled={isSubmitting || !response.trim()}
              className="bg-blue-900 hover:bg-blue-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Response
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
