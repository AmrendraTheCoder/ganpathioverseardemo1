"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "../../supabase/client";
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
    urgency: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const services = [
    "Offset Printing",
    "UV Printing",
    "Digital Printing",
    "Large Format",
    "Book Publishing",
    "Packaging Solutions",
    "Custom Quote",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear any previous status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const supabase = createClient();

      // Insert inquiry into database
      const { data, error } = await supabase
        .from("contact_inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
            status: "new",
            service_type: formData.service || null,
            urgency: formData.urgency,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      // Success - reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
        urgency: "normal",
      });

      setFormStatus({
        type: "success",
        message:
          "Thank you! Your inquiry has been submitted successfully. We'll get back to you within 2 hours during business hours.",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setFormStatus({
        type: "error",
        message:
          error.message ||
          "There was an error submitting your inquiry. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "bg-green-50 border-green-200 text-green-700";
      case "normal":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "high":
        return "bg-orange-50 border-orange-200 text-orange-700";
      case "critical":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {formStatus.type && (
        <div
          className={`p-4 rounded-lg border ${
            formStatus.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          } animate-in slide-in-from-top-2`}
        >
          <div className="flex items-start space-x-3">
            {formStatus.type === "success" ? (
              <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 mt-0.5 text-red-600" />
            )}
            <p className="text-sm font-medium">{formStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              disabled={isSubmitting}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              disabled={isSubmitting}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXX XXX XXXX"
              disabled={isSubmitting}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Service Interested In
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief subject of your inquiry"
            required
            disabled={isSubmitting}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Project Details <span className="text-red-500">*</span>
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your project requirements, quantity, timeline, and any special requirements..."
            required
            disabled={isSubmitting}
            rows={6}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Project Urgency
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: "low", label: "No Rush" },
              { value: "normal", label: "Normal" },
              { value: "high", label: "Urgent" },
              { value: "critical", label: "ASAP" },
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="sr-only"
                />
                <div
                  className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                    formData.urgency === option.value
                      ? getUrgencyColor(option.value)
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  } ${isSubmitting ? "opacity-50" : ""}`}
                >
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
          }
          className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-3" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>

      {/* Additional Info */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            Quick Response Guaranteed
          </span>
        </div>
        <p className="text-sm text-blue-700">
          We typically respond to all inquiries within 2 hours during business
          hours (Mon-Fri 9AM-6PM).
        </p>
      </div>
    </div>
  );
}
