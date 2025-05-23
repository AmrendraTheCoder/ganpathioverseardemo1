"use client";

import { useState } from "react";
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
import { Mail, Phone, Calendar, CheckCircle, Loader2 } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
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

  const supabase = createClient();

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

  const handleStatusChange = async (
    id: string,
    status: "new" | "in_progress" | "resolved",
  ) => {
    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status } : inquiry,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedInquiry) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({
          response,
          status: "resolved",
        })
        .eq("id", selectedInquiry.id);

      if (error) throw error;

      // Update local state
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === selectedInquiry.id
            ? { ...inquiry, response, status: "resolved" }
            : inquiry,
        ),
      );

      // Close dialog and reset form
      setIsDialogOpen(false);
      setResponse("");
    } catch (error) {
      console.error("Error sending response:", error);
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
        return <span className="inquiry-status-new">New</span>;
      case "in_progress":
        return <span className="inquiry-status-in-progress">In Progress</span>;
      case "resolved":
        return <span className="inquiry-status-resolved">Resolved</span>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Inquiries</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No inquiries found in this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredInquiries.map((inquiry) => (
                <Card key={inquiry.id} className="card-hover">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl">
                        {inquiry.subject}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(inquiry.created_at)}
                      </CardDescription>
                    </div>
                    {getStatusBadge(inquiry.status)}
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Message:</h4>
                        <p className="text-gray-600">{inquiry.message}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">From:</span>
                          <span>{inquiry.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1 text-gray-500" />
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {inquiry.email}
                          </a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            <a
                              href={`tel:${inquiry.phone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {inquiry.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {inquiry.response && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Response:
                          </h4>
                          <p className="text-gray-600">{inquiry.response}</p>
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
                    <Button onClick={() => openResponseDialog(inquiry)}>
                      {inquiry.response ? "Edit Response" : "Respond"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
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
              className={isSubmitting ? "btn-loading" : ""}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Response"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
