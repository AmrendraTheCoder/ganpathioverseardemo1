import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Star,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us - Ganpathi Overseas",
  description:
    "Get in touch with Ganpathi Overseas for all your printing needs. Request a quote or inquire about our services.",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      details: [
        "123 Printing Plaza, Hazratganj",
        "Lucknow, Uttar Pradesh 226001",
      ],
      action: "Get Directions",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 123 456 7890", "+91 987 654 3210"],
      action: "Call Now",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@ganpathioverseas.com", "quotes@ganpathioverseas.com"],
      action: "Send Email",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Mon-Fri: 9:00 AM - 6:00 PM",
        "Sat: 10:00 AM - 4:00 PM",
        "Sun: Closed",
      ],
      action: "View Calendar",
      color: "text-orange-600 bg-orange-50",
    },
  ];

  const faqs = [
    {
      question: "What's your typical turnaround time?",
      answer:
        "Most jobs are completed within 3-5 business days, depending on complexity and quantity.",
    },
    {
      question: "Do you provide design services?",
      answer:
        "Yes! Our creative team can help with design and layout for an additional fee.",
    },
    {
      question: "What file formats do you accept?",
      answer:
        "We accept PDF, AI, PSD, INDD, and most common image formats. PDF is preferred.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes, we provide delivery services within Lucknow and can arrange shipping anywhere in India.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Ready to bring your printing project to life? We're here to help
            with expert advice and competitive quotes.
          </p>
          <div className="flex justify-center">
            <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Average response time: 2 hours
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Send Us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 2
                  hours during business hours.
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${info.color}`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm mb-1">
                          {detail}
                        </p>
                      ))}
                      <Button variant="outline" size="sm" className="mt-3">
                        {info.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Ask Us Anything
            </CardTitle>
            <p className="text-center text-gray-600">
              Quick answers to common questions about our printing services
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ask Question CTA */}
            <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our printing experts are here to help you find the perfect
                solution for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Expert
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
