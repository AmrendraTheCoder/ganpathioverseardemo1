import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Printer,
  Palette,
  PenTool,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function ServicesPageStoryboard() {
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
      ],
      image:
        "https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=800&q=80",
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
            needs.
          </p>
        </div>
      </div>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-yellow-500 mb-4">{service.icon}</div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    Get Quote for {service.title}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
