"use client";

import { useState } from "react";
import { createClient } from "../../../supabase/client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  Calculator,
  Clock,
  Award,
  Phone,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    quantity: "",
    paperType: "",
    size: "",
    colors: "",
    finishType: "",
    urgency: "",
    budget: "",
    description: "",
    fileUpload: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const services = [
    "Offset Printing",
    "Digital Printing",
    "UV Printing",
    "Large Format Printing",
    "Book Publishing",
    "Packaging Solutions",
    "Custom Project",
  ];

  const paperTypes = [
    "Matte Paper",
    "Glossy Paper",
    "Uncoated Paper",
    "Textured Paper",
    "Cardstock",
    "Canvas",
    "Vinyl",
    "Other",
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, fileUpload: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const supabase = createClient();

      const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Quote Request - ${formData.service}`,
          message: `
Company: ${formData.company}
Service: ${formData.service}
Quantity: ${formData.quantity}
Paper Type: ${formData.paperType}
Size: ${formData.size}
Colors: ${formData.colors}
Finish: ${formData.finishType}
Urgency: ${formData.urgency}
Budget: ${formData.budget}
Description: ${formData.description}
File: ${formData.fileUpload ? formData.fileUpload.name : "None"}
            `.trim(),
          status: "new",
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        quantity: "",
        paperType: "",
        size: "",
        colors: "",
        finishType: "",
        urgency: "",
        budget: "",
        description: "",
        fileUpload: null,
      });
    } catch (error: any) {
      setError("Failed to submit quote request. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Quote Request Submitted!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your quote request. Our team will review your
                requirements and get back to you within 2-4 hours with a
                detailed quote.
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">
                  What happens next?
                </h3>
                <ul className="text-blue-700 space-y-2 text-left">
                  <li>• Our experts will review your requirements</li>
                  <li>• We'll prepare a detailed quote with pricing</li>
                  <li>• You'll receive the quote via email within 2-4 hours</li>
                  <li>• We'll schedule a consultation if needed</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Submit Another Quote
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-200 text-blue-600"
                >
                  <a href="tel:+911234567890">Call Us Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get Your Quote
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Tell us about your project and get a detailed quote within 2-4
              hours. Our experts are ready to help bring your vision to life.
            </p>

            {/* Quick Stats */}
            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2-4 Hours</div>
                <div className="text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Free</div>
                <div className="text-sm">Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Expert</div>
                <div className="text-sm">Advice</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Project Details
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below with as much detail as possible for
                    an accurate quote.
                  </p>
                </div>

                {error && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="h-12 border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="h-12 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 12345 67890"
                        className="h-12 border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="h-12 border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Service Required <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          handleChange("service", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-300">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="quantity"
                        className="text-sm font-medium text-gray-700"
                      >
                        Quantity <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 1000 pieces"
                        className="h-12 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Paper Type
                      </Label>
                      <Select
                        value={formData.paperType}
                        onValueChange={(value) =>
                          handleChange("paperType", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-300">
                          <SelectValue placeholder="Select paper type" />
                        </SelectTrigger>
                        <SelectContent>
                          {paperTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="size"
                        className="text-sm font-medium text-gray-700"
                      >
                        Size/Dimensions
                      </Label>
                      <Input
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        placeholder="e.g., A4, 8.5x11, Custom"
                        className="h-12 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="colors"
                        className="text-sm font-medium text-gray-700"
                      >
                        Colors
                      </Label>
                      <Input
                        id="colors"
                        name="colors"
                        value={formData.colors}
                        onChange={handleInputChange}
                        placeholder="e.g., Full Color, Black & White"
                        className="h-12 border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="finishType"
                        className="text-sm font-medium text-gray-700"
                      >
                        Finish Type
                      </Label>
                      <Input
                        id="finishType"
                        name="finishType"
                        value={formData.finishType}
                        onChange={handleInputChange}
                        placeholder="e.g., Matte, Glossy, UV Coating"
                        className="h-12 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Urgency
                      </Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) =>
                          handleChange("urgency", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-300">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard (7-10 days)
                          </SelectItem>
                          <SelectItem value="rush">Rush (3-5 days)</SelectItem>
                          <SelectItem value="urgent">
                            Urgent (1-2 days)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="budget"
                        className="text-sm font-medium text-gray-700"
                      >
                        Budget Range
                      </Label>
                      <Input
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="e.g., ₹10,000 - ₹25,000"
                        className="h-12 border-gray-300"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="fileUpload"
                      className="text-sm font-medium text-gray-700"
                    >
                      Upload Files (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                      <input
                        id="fileUpload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.ai,.eps,.psd"
                      />
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 text-center">
                          Click to upload your design files
                          <br />
                          <span className="text-xs text-gray-500">
                            PDF, JPG, PNG, AI, EPS, PSD (Max 10MB)
                          </span>
                        </p>
                        {formData.fileUpload && (
                          <p className="text-sm text-blue-600 mt-2 flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {formData.fileUpload.name}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Project Description{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Please describe your project in detail. Include any special requirements, deadlines, or specific needs..."
                      rows={6}
                      className="border-gray-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Submitting Quote Request...
                      </>
                    ) : (
                      "Get My Quote"
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  <Phone className="w-6 h-6 mr-3" />
                  Need Help?
                </h3>
                <p className="text-blue-700 mb-6">
                  Our printing experts are here to help you with your project
                  requirements.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+911234567890"
                    className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +91 123 456 7890
                  </a>
                  <a
                    href="mailto:info@ganpathioverseas.com"
                    className="flex items-center justify-center w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors font-medium"
                  >
                    Email Us
                  </a>
                </div>
              </div>

              {/* Process Timeline */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Our Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Quote Review
                      </h4>
                      <p className="text-sm text-gray-600">
                        We analyze your requirements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Detailed Quote
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive pricing within 2-4 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Production</h4>
                      <p className="text-sm text-gray-600">
                        Your project goes into production
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Delivery</h4>
                      <p className="text-sm text-gray-600">
                        Quality checked and delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center mb-3">
                  <Award className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">
                    Our Guarantee
                  </h4>
                </div>
                <p className="text-green-700 text-sm">
                  100% satisfaction guaranteed. If you're not happy with the
                  quality, we'll make it right at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
