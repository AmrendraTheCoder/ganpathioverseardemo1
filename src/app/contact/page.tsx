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
  Users,
  Award,
  Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Ganpathi Overseas | Get Your Quote Today",
  description:
    "Get in touch with Ganpathi Overseas for all your printing needs. Request a quote, ask questions, or visit our Lucknow location. We're here to help!",
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "Speak directly with our printing experts",
      info: "+91 123 456 7890",
      action: "tel:+911234567890",
      buttonText: "Call Now",
      available: "Mon-Fri: 9AM-6PM",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      description: "Send us your detailed requirements",
      info: "info@ganpathioverseas.com",
      action: "mailto:info@ganpathioverseas.com",
      buttonText: "Send Email",
      available: "24/7 Response",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      description: "Quick responses for urgent queries",
      info: "+91 123 456 7890",
      action: "https://wa.me/911234567890",
      buttonText: "Chat Now",
      available: "Instant Response",
    },
  ];

  const faqs = [
    {
      question: "What is your minimum order quantity?",
      answer:
        "Our minimum order varies by service. For offset printing, we recommend 500+ pieces for cost-effectiveness. Digital printing has no minimum, making it perfect for small runs.",
    },
    {
      question: "How long does it take to complete an order?",
      answer:
        "Turnaround time depends on the complexity and quantity. Digital printing: 1-3 days, Offset printing: 3-7 days, Large format: 2-4 days. Rush orders can be accommodated.",
    },
    {
      question: "Do you provide design services?",
      answer:
        "Yes! Our creative team can help with design, layout, and artwork preparation. We also offer free design consultations to optimize your prints.",
    },
    {
      question: "What file formats do you accept?",
      answer:
        "We accept PDF, AI, EPS, PSD, JPEG, and PNG files. For best results, provide high-resolution files with proper bleed and crop marks.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes, we provide delivery services across Lucknow and surrounding areas. For distant locations, we can arrange courier services.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Headphones className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Ready to bring your printing vision to life? Get in touch with our
              team of experts for personalized service and competitive quotes.
            </p>

            {/* Quick Stats */}
            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2 Hours</div>
                <div className="text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you. Our team is ready to
              help with all your printing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-200 transition-colors">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {method.info}
                </p>
                <p className="text-sm text-gray-500 mb-6">{method.available}</p>
                <a
                  href={method.action}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium hover:scale-105"
                >
                  {method.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  Visit Our Office
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-2 text-gray-900">
                        Address
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        123 Printing Plaza, Hazratganj
                        <br />
                        Lucknow, Uttar Pradesh 226001
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-2 text-gray-900">
                        Business Hours
                      </h4>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-blue-600" />
                  Why Choose Us?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      25+ years of experience
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      State-of-the-art equipment
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Expert design team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Competitive pricing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">On-time delivery</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">
                  Urgent Orders?
                </h4>
                <p className="text-red-700 text-sm mb-3">
                  Need rush printing services? Call our emergency line.
                </p>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Emergency: +91 123 456 7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our printing
              services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Don't see your question here?
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium hover:scale-105"
              >
                Ask Us Anything
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Lucknow, easily accessible from all parts
              of the city.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Interactive Map
              </h3>
              <p className="text-gray-500">
                Google Maps integration would go here
                <br />
                123 Printing Plaza, Hazratganj, Lucknow
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
