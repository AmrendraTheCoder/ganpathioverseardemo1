"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Eye,
  Share2,
  Star,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Download,
  Palette,
  Layers,
  Zap,
  Award,
} from "lucide-react";

// Gallery items data (you might want to move this to a separate file)
const galleryItems = [
  {
    id: 1,
    title: "Corporate Brochures",
    slug: "corporate-brochures",
    category: "brochures",
    image: "/images/gallery/IN_Bulk-Brochures_Hero-image_01.webp",
    description: "Professional corporate brochures with premium finishing",
    detailedDescription:
      "Our corporate brochures are designed to make a lasting impression. Using high-quality paper stocks and precision printing techniques, we create brochures that effectively communicate your brand message. From tri-fold to booklet-style brochures, we offer various formats with options for matte, gloss, or satin finishes.",
    features: [
      "Premium paper quality (250gsm - 350gsm)",
      "Multiple folding options",
      "Matte, gloss, or satin finishing",
      "Custom sizes available",
      "Fast turnaround time",
      "Bulk printing discounts",
    ],
    specifications: {
      sizes: ["A4", "A5", "DL", "Custom"],
      papers: ["Art Paper", "Matt Paper", "Gloss Paper", "Recycled Paper"],
      finishes: [
        "Matte Lamination",
        "Gloss Lamination",
        "Spot UV",
        "Embossing",
      ],
      bindingOptions: ["Tri-fold", "Gate-fold", "Z-fold", "Roll-fold"],
    },
    gallery: [
      "/images/gallery/IN_Bulk-Brochures_Hero-image_01.webp",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    testimonial: {
      text: "The quality of brochures exceeded our expectations. Professional finish and vibrant colors!",
      author: "Sarah Johnson",
      company: "Tech Solutions Inc.",
    },
    startingPrice: "₹15",
    turnaroundTime: "3-5 business days",
    tags: ["Corporate", "Marketing", "Professional", "Business"],
  },
  {
    id: 2,
    title: "Product Catalogs",
    slug: "product-catalogs",
    category: "catalogs",
    image: "/images/gallery/IN_booklets_tile_001.webp",
    description: "High-quality product catalogs with vibrant colors",
    detailedDescription:
      "Showcase your products in the best light with our professionally printed catalogs. We use advanced color matching techniques to ensure your products look exactly as intended. Perfect for trade shows, sales presentations, and customer distribution.",
    features: [
      "Perfect color reproduction",
      "Various binding options",
      "Custom page counts",
      "Professional layout design",
      "Bulk printing available",
      "Fast delivery options",
    ],
    specifications: {
      sizes: ["A4", "A5", "Square", "Custom"],
      papers: ["Matt Coated", "Silk Finish", "Uncoated", "Recycled"],
      finishes: [
        "Perfect Binding",
        "Saddle Stitching",
        "Wire-O Binding",
        "Case Binding",
      ],
      bindingOptions: ["8-200 pages", "Custom page count"],
    },
    gallery: [
      "/images/gallery/IN_booklets_tile_001.webp",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    testimonial: {
      text: "Our product catalog has never looked better. The color quality is outstanding!",
      author: "Mike Chen",
      company: "Fashion Hub",
    },
    startingPrice: "₹25",
    turnaroundTime: "5-7 business days",
    tags: ["Products", "Catalog", "Marketing", "Sales"],
  },
  {
    id: 3,
    title: "Business Cards",
    slug: "business-cards",
    category: "cards",
    image: "/images/gallery/visting_card.webp",
    description: "Elegant business cards with various finishing options",
    detailedDescription:
      "Make a memorable first impression with our premium business cards. Available in various sizes, finishes, and special effects including embossing, foil stamping, and spot UV coating. Choose from standard or luxury card stocks.",
    features: [
      "Multiple card stocks available",
      "Special finishing options",
      "Quick turnaround",
      "Rounded corners option",
      "Bulk discounts",
      "Free design consultation",
    ],
    specifications: {
      sizes: ["Standard (90x54mm)", "European (85x55mm)", "Square", "Custom"],
      papers: [
        "Standard Card",
        "Premium Card",
        "Textured Card",
        "Plastic Cards",
      ],
      finishes: [
        "Matte",
        "Gloss",
        "Spot UV",
        "Foil Stamping",
        "Embossing",
        "Debossing",
      ],
      bindingOptions: ["Single sided", "Double sided"],
    },
    gallery: [
      "/images/gallery/visting_card.webp",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    ],
    testimonial: {
      text: "Professional quality cards that really make an impact. Love the finishing options!",
      author: "Jennifer Smith",
      company: "Creative Agency",
    },
    startingPrice: "₹8",
    turnaroundTime: "2-3 business days",
    tags: ["Business", "Professional", "Networking", "Corporate"],
  },
  // Add more items as needed...
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function GalleryItemPage({ params }: PageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Find the gallery item by slug
  const item = galleryItems.find((item) => item.slug === params.slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Item Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The gallery item you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get related items (same category, different items)
  const relatedItems = galleryItems
    .filter(
      (relatedItem) =>
        relatedItem.category === item.category && relatedItem.id !== item.id
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Gallery
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.print()}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Print Details
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: item.title,
                      text: item.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={item.gallery[currentImageIndex]}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Navigation */}
            {item.gallery.length > 1 && (
              <div className="flex space-x-2">
                {item.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-blue-500 scale-105"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                  {item.category}
                </span>
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {item.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {item.detailedDescription}
              </p>

              <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Starting Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    {item.startingPrice}
                  </p>
                  <p className="text-sm text-gray-500">per piece</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Turnaround Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {item.turnaroundTime}
                  </p>
                  <p className="text-sm text-gray-500">standard delivery</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="flex-1 bg-blue-600 text-white text-center py-4 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="flex-1 border-2 border-blue-600 text-blue-600 text-center py-4 px-8 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {["overview", "specifications", "features"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm uppercase tracking-wide transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Product Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.detailedDescription}
                  </p>
                </div>

                {/* Key Features Grid */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 mb-3 italic">
                        "{item.testimonial.text}"
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.testimonial.author}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Technical Specifications
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-blue-600" />
                      Available Sizes
                    </h4>
                    <div className="space-y-2">
                      {item.specifications.sizes.map((size, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700"
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-blue-600" />
                      Paper Options
                    </h4>
                    <div className="space-y-2">
                      {item.specifications.papers.map((paper, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700"
                        >
                          {paper}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-blue-600" />
                      Finishing Options
                    </h4>
                    <div className="space-y-2">
                      {item.specifications.finishes.map((finish, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700"
                        >
                          {finish}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-blue-600" />
                      Binding Options
                    </h4>
                    <div className="space-y-2">
                      {item.specifications.bindingOptions.map(
                        (binding, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700"
                          >
                            {binding}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Detailed Features
                </h3>

                <div className="grid gap-6">
                  {item.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {feature}
                        </h4>
                        <p className="text-gray-600">
                          This feature ensures high-quality results and
                          professional appearance for your printed materials.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedItems.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Products
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedItems.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/gallery/${relatedItem.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedItem.image}
                      alt={relatedItem.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedItem.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {relatedItem.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium capitalize">
                        {relatedItem.category}
                      </span>
                      <span className="text-blue-600 font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a personalized quote for your {item.title.toLowerCase()}{" "}
            project. Our team is ready to help bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/quote"
              className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
