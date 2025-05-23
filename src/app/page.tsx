"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  Printer,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Shield,
  Eye,
  Camera,
  Play,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Calendar,
  TrendingUp,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGalleryPage, setCurrentGalleryPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Company logos - text-based for now
  const clientLogos = [
    { name: "Havells", textLogo: true },
    { name: "Idea", textLogo: true },
    { name: "Airtel", textLogo: true },
    { name: "Aircel", textLogo: true },
    { name: "BQ", textLogo: true },
    { name: "Vodafone", textLogo: true },
    { name: "Reliance", textLogo: true },
    { name: "BSNL", textLogo: true },
  ];

  // Gallery items with categories
  const galleryItems = [
    {
      id: 1,
      title: "Corporate Brochures",
      category: "brochures",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop",
      description: "Professional corporate brochures with premium finishing",
    },
    {
      id: 2,
      title: "Product Catalogs",
      category: "catalogs",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
      description: "High-quality product catalogs with vibrant colors",
    },
    {
      id: 3,
      title: "Business Cards",
      category: "cards",
      image:
        "https://images.unsplash.com/photo-1541411006633-e1db4c6dd92b?w=500&h=400&fit=crop",
      description: "Elegant business cards with various finishing options",
    },
    {
      id: 4,
      title: "Large Format Banners",
      category: "banners",
      image:
        "https://images.unsplash.com/photo-1616070829624-a11213034646?w=500&h=400&fit=crop",
      description: "Eye-catching banners for events and promotions",
    },
    {
      id: 5,
      title: "Book Publishing",
      category: "books",
      image:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=500&h=400&fit=crop",
      description: "Professional book printing and binding services",
    },
    {
      id: 6,
      title: "Packaging Design",
      category: "packaging",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=400&fit=crop",
      description: "Custom packaging solutions for your products",
    },
    {
      id: 7,
      title: "Wedding Invitations",
      category: "invitations",
      image:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c73a?w=500&h=400&fit=crop",
      description: "Beautiful wedding invitations with elegant designs",
    },
    {
      id: 8,
      title: "Menu Cards",
      category: "menus",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&h=400&fit=crop",
      description: "Restaurant menu cards with premium paper quality",
    },
    {
      id: 9,
      title: "Promotional Flyers",
      category: "flyers",
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=400&fit=crop",
      description: "Attention-grabbing promotional flyers",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rajesh Gupta",
      company: "Tech Solutions Pvt Ltd",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
      rating: 5,
      text: "Outstanding quality and service! Ganpathi Overseas delivered our corporate brochures on time with exceptional print quality.",
    },
    {
      name: "Priya Sharma",
      company: "Fashion Hub",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      rating: 5,
      text: "Their attention to detail is remarkable. The packaging design for our products exceeded our expectations completely.",
    },
    {
      name: "Amit Patel",
      company: "Food Corner Restaurant",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
      rating: 5,
      text: "Professional team, competitive pricing, and excellent quality. Highly recommend for all printing needs.",
    },
  ];

  // Services data
  const services = [
    {
      icon: <Printer className="w-8 h-8" />,
      title: "Offset Printing",
      description:
        "High-quality offset printing for large volumes with exceptional color accuracy.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Printing",
      description:
        "Fast turnaround digital printing perfect for small to medium runs.",
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Large Format",
      description:
        "Eye-catching banners, posters, and signage for maximum impact.",
      image:
        "https://images.unsplash.com/photo-1616070829624-a11213034646?w=400&h=300&fit=crop",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "UV Printing",
      description:
        "Durable UV printing on various materials with vibrant colors.",
      image:
        "https://images.unsplash.com/photo-1598537179958-687e6cc425d7?w=400&h=300&fit=crop",
    },
  ];

  // Filter gallery items
  const filteredGallery =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
  const currentItems = filteredGallery.slice(
    currentGalleryPage * itemsPerPage,
    (currentGalleryPage + 1) * itemsPerPage
  );

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Gallery categories
  const categories = [
    { id: "all", name: "All Work", count: galleryItems.length },
    {
      id: "brochures",
      name: "Brochures",
      count: galleryItems.filter((item) => item.category === "brochures")
        .length,
    },
    {
      id: "catalogs",
      name: "Catalogs",
      count: galleryItems.filter((item) => item.category === "catalogs").length,
    },
    {
      id: "cards",
      name: "Business Cards",
      count: galleryItems.filter((item) => item.category === "cards").length,
    },
    {
      id: "banners",
      name: "Banners",
      count: galleryItems.filter((item) => item.category === "banners").length,
    },
    {
      id: "books",
      name: "Books",
      count: galleryItems.filter((item) => item.category === "books").length,
    },
    {
      id: "packaging",
      name: "Packaging",
      count: galleryItems.filter((item) => item.category === "packaging")
        .length,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <div className="w-32 h-32 border border-white rounded-full"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-pulse delay-1000">
          <div className="w-24 h-24 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Premium Printing
              <span className="block text-yellow-400 gradient-text">
                Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform your ideas into stunning prints with 25+ years of
              expertise, cutting-edge technology, and unmatched quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/quote"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-blue-900 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 shadow-lg animate-bounce"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-200"
              >
                View Services
              </Link>
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Video
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  25+
                </div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  1000+
                </div>
                <div className="text-blue-200">Happy Clients</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  50+
                </div>
                <div className="text-blue-200">Team Members</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-blue-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Logo Bar - Enhanced */}
      <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Trusted by Leading Brands
            </h2>
            <p className="text-gray-600">
              We're proud to serve these amazing companies
            </p>
          </div>

          <div className="relative">
            <div className="flex logo-scroll space-x-16 items-center">
              {clientLogos.concat(clientLogos).map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 h-16 w-32 relative flex items-center justify-center"
                >
                  <div className="text-2xl font-bold text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:shadow-lg">
                    {client.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - NEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that set us apart in the printing industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300">
              <Target className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Precision & Accuracy</h3>
              <p className="text-gray-600">
                State-of-the-art equipment ensures every print meets exact
                specifications with consistent quality.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-all duration-300">
              <Lightbulb className="w-12 h-12 text-green-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Creative Solutions</h3>
              <p className="text-gray-600">
                Our design team helps bring your vision to life with innovative
                and creative printing solutions.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-all duration-300">
              <Rocket className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Fast Turnaround</h3>
              <p className="text-gray-600">
                Quick delivery without compromising quality. Rush orders
                completed in 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - NEW MAJOR FEATURE */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Work Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successful projects across various
              printing categories
            </p>
          </div>

          {/* Gallery Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentGalleryPage(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <button className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium capitalize">
                      {item.category}
                    </span>
                    <Link
                      href="/quote"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Order Similar →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() =>
                  setCurrentGalleryPage(Math.max(0, currentGalleryPage - 1))
                }
                disabled={currentGalleryPage === 0}
                className="p-2 rounded-full bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentGalleryPage(i)}
                    className={`w-10 h-10 rounded-full font-medium transition-colors ${
                      currentGalleryPage === i
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentGalleryPage(
                    Math.min(totalPages - 1, currentGalleryPage + 1)
                  )
                }
                disabled={currentGalleryPage === totalPages - 1}
                className="p-2 rounded-full bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we deliver exceptional printing
              solutions tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden service-card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href="/quote"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Get Quote
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <Quote className="w-12 h-12 text-yellow-400 mb-6 mx-auto" />

                <div className="text-center mb-8">
                  <p className="text-xl md:text-2xl leading-relaxed mb-6">
                    "{testimonials[currentSlide].text}"
                  </p>

                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(testimonials[currentSlide].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentSlide].image}
                        alt={testimonials[currentSlide].name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold">
                        {testimonials[currentSlide].name}
                      </h4>
                      <p className="text-blue-200 text-sm">
                        {testimonials[currentSlide].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentSlide === index ? "bg-yellow-400" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Ganpathi Overseas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional craftsmanship with modern technology to
              deliver unmatched quality and service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Assured
              </h3>
              <p className="text-gray-600">
                ISO certified processes ensuring consistent, high-quality output
                every time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick turnaround times without compromising on quality or
                attention to detail.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Skilled professionals with decades of experience in the printing
                industry.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customer Focused
              </h3>
              <p className="text-gray-600">
                Personalized service and dedicated support throughout your
                project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get a free quote today and discover why thousands of businesses
            trust us with their printing needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-10 py-5 bg-yellow-500 text-blue-900 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
