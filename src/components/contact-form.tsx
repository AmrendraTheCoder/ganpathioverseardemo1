"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "../../supabase/client";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const supabase = createClient();

      const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: "new",
        },
      ]);

      if (error) throw error;

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setFormStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        type: "error",
        message:
          "There was an error submitting your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form-grid">
        <div className="contact-form-field">
          <label htmlFor="name" className="contact-form-label">
            Full Name <span className="contact-form-required">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={formStatus.type === "error" ? "form-error" : ""}
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor="email" className="contact-form-label">
            Email <span className="contact-form-required">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className={formStatus.type === "error" ? "form-error" : ""}
          />
        </div>
      </div>

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <label htmlFor="phone" className="contact-form-label">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor="subject" className="contact-form-label">
            Subject <span className="contact-form-required">*</span>
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Subject of your inquiry"
            className={formStatus.type === "error" ? "form-error" : ""}
          />
        </div>
      </div>

      <div className="contact-form-field">
        <label htmlFor="message" className="contact-form-label">
          Message <span className="contact-form-required">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Please describe your project or inquiry"
          rows={6}
          className={formStatus.type === "error" ? "form-error" : ""}
        />
      </div>

      {formStatus.type && (
        <div
          className={`p-4 rounded-md ${
            formStatus.type === "success" ? "success-message" : "error-message"
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <Button
        type="submit"
        className={`bg-blue-900 hover:bg-blue-800 text-white px-8 py-2 ${isSubmitting ? "btn-loading" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
