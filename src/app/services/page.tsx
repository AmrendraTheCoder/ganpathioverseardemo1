"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrintSamplesPopup from "@/components/print-samples-popup";
import {
  Printer,
  Palette,
  PenTool,
  Image as ImageIcon,
  BookOpen,
  Maximize2,
  CheckCircle,
  ArrowRight,
  Star,
  Calculator,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      icon: <Printer className="w-10 h-10" />,
      title: "Offset Printing",
      description:
        "High-quality offset printing for large volume projects with precise color reproduction and cost-effectiveness.",
      features: [
        "Superior color accuracy and consistency",
        "Cost-effective for runs of 500+ pieces",
        "Works on various paper types and weights",
        "Pantone color matching available",
      ],
      // More relevant printing industry image
      image: "/images/services/offset-printing.jpg",
      popular: true,
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: "UV Printing",
      description:
        "Advanced UV curing technology for vibrant, durable prints on various materials including plastic, metal, and glass.",
      features: [
        "Instant curing with UV light technology",
        "Exceptional durability and scratch resistance",
        "Works on non-porous materials",
        "Vibrant colors that don't fade",
      ],
      // UV printing specific image
      image: "/images/services/UV_Printing.webp",
      popular: false,
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "Digital Printing",
      description:
        "Fast turnaround digital printing perfect for short runs, variable data printing, and quick prototypes.",
      features: [
        "No minimum order quantity required",
        "Variable data and personalization",
        "Quick turnaround (same day possible)",
        "Perfect for proofs and small runs",
      ],
      // Digital printing equipment image
      image: "/images/services/Digital_Printing.jpg",
      popular: false,
    },
    {
      icon: <ImageIcon className="w-10 h-10" />,
      title: "Large Format Printing",
      description:
        "Eye-catching banners, posters, and signage up to 10 feet wide for maximum visual impact.",
      features: [
        "Prints up to 10 feet wide",
        "Indoor and outdoor materials available",
        "Weather-resistant options",
        "Custom mounting and finishing",
      ],
      // Large format banner/poster image
      image: "/images/services/large_format_printing.webp",
      popular: false,
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Book Publishing",
      description:
        "Complete book printing and binding services from novels to technical manuals with professional finishing.",
      features: [
        "Perfect binding, saddle stitch, hardcover",
        "Premium paper options available",
        "Custom cover design services",
        "ISBN registration assistance",
      ],
      // Book printing/binding image
      image: "/images/services/book_publishing.jpg",
      popular: false,
    },
    {
      icon: <Maximize2 className="w-10 h-10" />,
      title: "Packaging Solutions",
      description:
        "Custom packaging design and printing that enhances your product presentation and strengthens brand identity.",
      features: [
        "Custom structural design",
        "Eco-friendly material options",
        "Food-safe packaging available",
        "Brand-focused design approach",
      ],
      // Packaging/boxes image
      image: "/images/services/packaging_solutions.jpg",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Better Spacing */}
      <div className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive printing solutions tailored to meet your business
              needs with exceptional quality and service.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-sm">Core Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm">Quality Assured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid with Better Spacing */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {service.popular && (
                      <div className="absolute top-6 left-6 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full flex items-center space-x-2 font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Most Popular</span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`space-y-8 ${index % 2 === 1 ? "md:col-start-1" : ""}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl text-blue-600">
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {service.title}
                      </h2>
                      {service.popular && (
                        <div className="text-yellow-600 font-medium text-sm">
                          ★ Most Popular Service
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Calculator className="mr-2 w-5 h-5" />
                      Get Quote for {service.title}
                    </Link>
                    <button
                      onClick={() => setSelectedService(service.title)}
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
                    >
                      <Eye className="mr-2 w-5 h-5" />
                      Print Samples
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Our Process
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven process to ensure your projects are completed
              with excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We discuss your requirements and provide expert advice",
              },
              {
                step: "02",
                title: "Design",
                desc: "Our team creates or refines your design for optimal printing",
              },
              {
                step: "03",
                title: "Production",
                desc: "State-of-the-art equipment brings your vision to life",
              },
              {
                step: "04",
                title: "Delivery",
                desc: "Quality checked and delivered on time, every time",
              },
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Contact us today to discuss your printing needs and get a custom
            quote for your project. Our team is ready to bring your vision to
            life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-10 py-5 bg-yellow-500 text-blue-900 rounded-xl hover:bg-yellow-400 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Calculator className="mr-2 w-6 h-6" />
              Get Free Quote
            </Link>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-200 text-lg font-semibold"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Print Samples Popup */}
      <PrintSamplesPopup
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        serviceTitle={selectedService || ""}
      />
    </div>
  );
}
