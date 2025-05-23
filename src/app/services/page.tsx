import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Metadata } from "next";
import {
  Printer,
  Palette,
  PenTool,
  Image as ImageIcon,
  BookOpen,
  Maximize2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services - Ganpathi Overseas",
  description:
    "Comprehensive printing services including offset printing, UV printing, digital printing, large format, book publishing, and packaging solutions.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Printer className="w-8 h-8" />,
      title: "Offset Printing",
      description:
        "Traditional printing method delivering exceptional quality for large volume projects with precise color reproduction.",
      features: [
        "High-quality color reproduction",
        "Cost-effective for large runs",
        "Various paper types supported",
        "Pantone color matching",
      ],
      image:
        "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&q=80",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UV Printing",
      description:
        "Advanced UV technology for vibrant colors and durability on various materials including plastic, metal, and glass.",
      features: [
        "Vibrant, durable colors",
        "Works on multiple materials",
        "Instant drying",
        "Scratch and fade resistant",
      ],
      image:
        "https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=800&q=80",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Digital Printing",
      description:
        "Fast turnaround for short-run projects with customization options and consistent quality.",
      features: [
        "Quick turnaround time",
        "Variable data printing",
        "Cost-effective for small runs",
        "High-quality output",
      ],
      image:
        "https://images.unsplash.com/photo-1598537179958-687e6cc425d7?w=800&q=80",
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Large Format Printing",
      description:
        "Eye-catching banners, posters, and signage that make a big impression for your business.",
      features: [
        "Up to 10 feet wide",
        "Indoor and outdoor materials",
        "Weather-resistant options",
        "Custom sizes available",
      ],
      image:
        "https://images.unsplash.com/photo-1616070829624-a11213034646?w=800&q=80",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Book Publishing",
      description:
        "Complete book printing and binding services with premium paper options and finishing touches.",
      features: [
        "Multiple binding options",
        "Premium paper selection",
        "Custom cover design",
        "ISBN registration support",
      ],
      image:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80",
    },
    {
      icon: <Maximize2 className="w-8 h-8" />,
      title: "Packaging Solutions",
      description:
        "Custom packaging design and printing that enhances your product presentation and brand identity.",
      features: [
        "Custom design service",
        "Eco-friendly materials",
        "Various packaging types",
        "Brand enhancement focus",
      ],
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive printing solutions tailored to meet your business
            needs with exceptional quality and service.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                  <div className="text-yellow-500 mb-4">{service.icon}</div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Get Quote for {service.title}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your printing needs and get a custom
            quote for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-lg font-medium"
            >
              Request a Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center px-8 py-4 text-blue-900 bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
