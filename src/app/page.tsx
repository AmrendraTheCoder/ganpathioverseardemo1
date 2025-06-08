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
import Head from "next/head";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGalleryPage, setCurrentGalleryPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Gallery action handlers
  const handleViewItem = (item: any) => {
    // Open item in a modal or navigate to dedicated page
    window.open(item.link, "_blank");
  };

  const handleShareItem = async (item: any) => {
    const shareUrl = `${window.location.origin}${item.link}`;
    const shareText = `Check out this amazing ${item.title} by Ganpathi Overseas`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        // Fallback to clipboard
        copyToClipboard(shareUrl);
      }
    } else {
      // Fallback to clipboard copy
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Link copied to clipboard!");
    }
  };

  // Company logos - adjusted for 120x120px
  const clientLogos = [
    { name: "Havells", logoUrl: "/images/logos/Havells.png" },
    { name: "Idea", logoUrl: "/images/logos/idea.png" },
    { name: "Airtel", logoUrl: "/images/logos/airtel1.png" },
    { name: "BBQ", logoUrl: "/images/logos/bbq.png" },
  ];

  // Gallery items with categories
  const galleryItems = [
    {
      id: 1,
      title: "Corporate Brochures",
      category: "brochures",
      image: "/images/gallery/IN_Bulk-Brochures_Hero-image_01.webp",
      description: "Professional corporate brochures with premium finishing",
      link: "/gallery/corporate-brochures",
    },
    {
      id: 2,
      title: "Product Catalogs",
      category: "catalogs",
      image: "/images/gallery/IN_booklets_tile_001.webp",
      description: "High-quality product catalogs with vibrant colors",
      link: "/gallery/product-catalogs",
    },
    {
      id: 3,
      title: "Business Cards",
      category: "cards",
      image: "/images/gallery/visting_card.webp",
      description: "Elegant business cards with various finishing options",
      link: "/gallery/business-cards",
    },
    {
      id: 4,
      title: "Large Format Banners",
      category: "banners",
      image: "/images/gallery/banners_01.jpeg",
      description: "Eye-catching banners for events and promotions",
      link: "/gallery/large-format-banners",
    },
    {
      id: 5,
      title: "Book Publishing",
      category: "books",
      image: "/images/gallery/book_booklet.jpeg",
      description: "Professional book printing and binding services",
      link: "/gallery/book-publishing",
    },
    {
      id: 6,
      title: "Packaging Design",
      category: "packaging",
      image: "/images/gallery/packaging.webp",
      description: "Custom packaging solutions for your products",
      link: "/gallery/packaging-design",
    },
    {
      id: 7,
      title: "Wedding Invitations",
      category: "invitations",
      image: "/images/gallery/wedding_card.webp",
      description: "Beautiful wedding invitations with elegant designs",
      link: "/gallery/wedding-invitations",
    },
    {
      id: 8,
      title: "Menu Cards",
      category: "menus",
      image: "/images/gallery/IN_Menus_002.webp",
      description: "Restaurant menu cards with premium paper quality",
      link: "/gallery/menu-cards",
    },
    {
      id: 9,
      title: "Promotional Flyers",
      category: "flyers",
      image: "/images/gallery/IN-postcards-overview.webp",
      description: "Attention-grabbing promotional flyers",
      link: "/gallery/promotional-flyers",
    },
    {
      id: 10,
      title: "Annual Reports",
      category: "brochures",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      description: "Professional annual reports with detailed layouts",
      link: "/gallery/annual-reports",
    },
    {
      id: 11,
      title: "Magazine Printing",
      category: "books",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      description: "High-quality magazine printing with perfect binding",
      link: "/gallery/magazine-printing",
    },
    {
      id: 12,
      title: "Corporate Stationery",
      category: "cards",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
      description: "Complete corporate stationery solutions",
      link: "/gallery/corporate-stationery",
    },
    {
      id: 13,
      title: "Trade Show Displays",
      category: "banners",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      description: "Eye-catching trade show displays and backdrops",
      link: "/gallery/trade-show-displays",
    },
    {
      id: 14,
      title: "Event Invitations",
      category: "invitations",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      description: "Custom event invitations for all occasions",
      link: "/gallery/event-invitations",
    },
    {
      id: 15,
      title: "Food Packaging",
      category: "packaging",
      image:
        "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?w=800&q=80",
      description: "Food-grade packaging with attractive designs",
      link: "/gallery/food-packaging",
    },
    {
      id: 16,
      title: "Vinyl Banners",
      category: "banners",
      image:
        "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80",
      description: "Durable vinyl banners for outdoor use",
      link: "/gallery/vinyl-banners",
    },
    {
      id: 17,
      title: "Leaflets & Pamphlets",
      category: "flyers",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
      description: "Cost-effective leaflets and pamphlets",
      link: "/gallery/leaflets-pamphlets",
    },
    {
      id: 18,
      title: "Certificate Printing",
      category: "cards",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      description: "Professional certificates with security features",
      link: "/gallery/certificate-printing",
    },
    {
      id: 19,
      title: "Greeting Cards",
      category: "invitations",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
      description: "Custom greeting cards for special occasions",
      link: "/gallery/greeting-cards",
    },
    {
      id: 20,
      title: "Product Labels",
      category: "packaging",
      image:
        "https://images.unsplash.com/photo-1580169980114-ccd0babfa840?w=800&q=80",
      description: "High-quality product labels and stickers",
      link: "/gallery/product-labels",
    },
    {
      id: 21,
      title: "Booklets & Manuals",
      category: "books",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      description: "Instructional booklets and user manuals",
      link: "/gallery/booklets-manuals",
    },
    {
      id: 22,
      title: "Poster Printing",
      category: "banners",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
      description: "High-resolution poster printing in various sizes",
      link: "/gallery/poster-printing",
    },
    {
      id: 23,
      title: "Corporate Folders",
      category: "brochures",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      description: "Professional presentation folders",
      link: "/gallery/corporate-folders",
    },
    {
      id: 24,
      title: "Window Graphics",
      category: "banners",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      description: "Attractive window graphics and displays",
      link: "/gallery/window-graphics",
    },
    {
      id: 25,
      title: "Calendars",
      category: "books",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      description: "Custom calendars for corporate and personal use",
      link: "/gallery/calendars",
    },
    {
      id: 26,
      title: "Table Tents",
      category: "menus",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      description: "Promotional table tents for restaurants",
      link: "/gallery/table-tents",
    },
    {
      id: 27,
      title: "Roll-up Banners",
      category: "banners",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      description: "Portable roll-up banners for events",
      link: "/gallery/roll-up-banners",
    },
    {
      id: 28,
      title: "Gift Packaging",
      category: "packaging",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      description: "Elegant gift boxes and packaging solutions",
      link: "/gallery/gift-packaging",
    },
    {
      id: 29,
      title: "Notebook Printing",
      category: "books",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      description: "Custom notebooks and journals",
      link: "/gallery/notebook-printing",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rajesh Gupta",
      company: "Tech Solutions Pvt Ltd",
      image: "/images/testimonialsPerson/Rajesh_gupta.avif",
      rating: 5,
      text: "Outstanding quality and service! Ganpathi Overseas delivered our corporate brochures on time with exceptional print quality.",
    },
    {
      name: "Priya Sharma",
      company: "Fashion Hub",
      image: "/images/testimonialsPerson/priya_sharma.avif",
      rating: 5,
      text: "Their attention to detail is remarkable. The packaging design for our products exceeded our expectations completely.",
    },
    {
      name: "Amit Patel",
      company: "Food Corner Restaurant",
      image: "/images/testimonialsPerson/amit_patel.avif",
      rating: 5,
      text: "Professional team, competitive pricing, and excellent quality. Highly recommend for all printing needs.",
    },
    {
      name: "Sneha Agarwal",
      company: "Divine Weddings",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "The wedding invitation cards were absolutely stunning! The gold foil finish and premium paper quality made our special day even more memorable.",
    },
    {
      name: "Vikram Singh",
      company: "Singh Enterprises",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "We've been using Ganpathi Overseas for 5 years. Their consistency in quality and timely delivery has made them our go-to printing partner.",
    },
    {
      name: "Meera Joshi",
      company: "Joshi Textiles",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "The product catalogs they printed for us helped increase our sales by 40%. The color accuracy and paper quality were exceptional.",
    },
    {
      name: "Arjun Malhotra",
      company: "Malhotra Industries",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Their offset printing service is top-notch. Large volume orders are handled efficiently with consistent quality throughout.",
    },
    {
      name: "Kavita Reddy",
      company: "Red Rose Catering",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "The menu cards and table tents transformed our restaurant's presentation. Customers constantly compliment the professional look.",
    },
    {
      name: "Rohit Sharma",
      company: "Sharma Pharmaceuticals",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Medical packaging requires precision and compliance. Ganpathi Overseas delivered exactly what we needed with perfect quality control.",
    },
    {
      name: "Anita Gupta",
      company: "Gupta Fashion House",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "The product tags and labels have enhanced our brand image significantly. The UV coating gives them a premium feel.",
    },
    {
      name: "Deepak Kumar",
      company: "Kumar Construction",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Large format banners for our construction sites are always delivered on time. Weather-resistant quality that lasts months.",
    },
    {
      name: "Sanjana Rao",
      company: "Rao Educational Institute",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Textbooks, certificates, and educational materials - all printed with perfect clarity. Student satisfaction has improved noticeably.",
    },
    {
      name: "Manish Tiwari",
      company: "Tiwari Automobiles",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Service manuals and promotional materials are always print-ready. Their digital printing service is incredibly fast and reliable.",
    },
    {
      name: "Pooja Agarwal",
      company: "Agarwal Jewellers",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "The jewelry catalogs showcase our pieces beautifully. The high-gloss finish and color accuracy make our gold look even more stunning.",
    },
    {
      name: "Suresh Yadav",
      company: "Yadav Organics",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Organic food packaging requires special care. Their eco-friendly printing options align perfectly with our brand values.",
    },
    {
      name: "Ritu Saxena",
      company: "Saxena Events",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "From invitations to event banners, every print job is handled with perfection. Our clients always ask who did the printing!",
    },
    {
      name: "Ashish Pandey",
      company: "Pandey Publications",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Book printing quality is exceptional. The binding is durable and the pages are perfectly aligned. Highly professional service.",
    },
    {
      name: "Nisha Verma",
      company: "Verma Beauty Salon",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Promotional flyers and business cards have helped grow our clientele. The design suggestions were spot-on and increased walk-ins.",
    },
    {
      name: "Gaurav Singh",
      company: "Singh IT Solutions",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Technical documentation and user manuals are printed with crystal clear text. No complaints from our international clients.",
    },
  ];

  // Services data
  const services = [
    {
      icon: <Printer className="w-8 h-8" />,
      title: "Offset Printing",
      description:
        "High-quality offset printing for large volumes with exceptional color accuracy.",
      image: "/images/services/offset-printing.jpg",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Printing",
      description:
        "Fast turnaround digital printing perfect for small to medium runs.",
      image: "/images/services/Digital_Printing.jpg",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Large Format",
      description:
        "Eye-catching banners, posters, and signage for maximum impact.",
      image: "/images/services/large_format_printing.webp",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "UV Printing",
      description:
        "Durable UV printing on various materials with vibrant colors.",
      image: "/images/services/UV_Printing.webp",
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
    {
      id: "invitations",
      name: "Invitations",
      count: galleryItems.filter((item) => item.category === "invitations")
        .length,
    },
    {
      id: "flyers",
      name: "Flyers",
      count: galleryItems.filter((item) => item.category === "flyers").length,
    },
    {
      id: "menus",
      name: "Menus",
      count: galleryItems.filter((item) => item.category === "menus").length,
    },
  ];

  return (
    <>
      <Head>
        <title>Ganpathi Overseas | Premium Print & Packaging Solutions</title>
        <meta
          name="description"
          content="Ganpathi Overseas delivers top-tier printing services including brochures, catalogs, cards, banners, packaging, and more. 20+ years of excellence in print craftsmanship."
        />
        <meta
          name="keywords"
          content="printing services, brochures, packaging, Ganpathi Overseas, offset printing, digital print, UV print, Jaipur print shop"
        />
        <meta name="author" content="Ganpathi Overseas" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ganpathioverseas.com/" />
        <meta
          property="og:title"
          content="Ganpathi Overseas | Premium Print & Packaging"
        />
        <meta
          property="og:description"
          content="20+ years of precision in print. Discover offset, digital, UV printing, banners, packaging & more."
        />
        <meta property="og:image" content="/images/seo/preview.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ganpathi Overseas | Premium Print & Packaging"
        />
        <meta
          name="twitter:description"
          content="Elevating print excellence with cutting-edge technology and premium finishing."
        />
        <meta name="twitter:image" content="/images/seo/preview.jpg" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section - Enhanced with Printing Theme Background */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 text-white relative overflow-hidden min-h-screen flex items-center">
          {/* Printing-themed Background Pattern */}
          <div className="absolute inset-0">
            {/* CMYK Color Dots Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, #00ffff 2px, transparent 2px),
                    radial-gradient(circle at 40% 40%, #ff00ff 2px, transparent 2px),
                    radial-gradient(circle at 60% 60%, #ffff00 2px, transparent 2px),
                    radial-gradient(circle at 80% 80%, #000000 2px, transparent 2px)
                  `,
                  backgroundSize:
                    "120px 120px, 140px 140px, 160px 160px, 180px 180px",
                  backgroundPosition: "0 0, 30px 30px, 60px 60px, 90px 90px",
                }}
              ></div>
            </div>

            {/* Subtle Grid Lines */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>

            {/* Printing Elements Floating Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Print Rollers */}
              <div
                className={`absolute top-1/4 left-1/4 w-96 h-4 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full transform transition-all duration-1000 ease-out ${
                  mounted ? "rotate-12 opacity-100" : "rotate-0 opacity-0"
                }`}
              ></div>
              <div
                className={`absolute bottom-1/3 right-1/4 w-64 h-3 bg-gradient-to-r from-magenta-400/20 to-pink-400/20 rounded-full transform transition-all duration-1000 ease-out delay-500 ${
                  mounted ? "rotate-[-12deg] opacity-100" : "rotate-0 opacity-0"
                }`}
              ></div>

              {/* Ink Drops */}
              <div
                className={`absolute top-1/2 right-1/3 w-6 h-6 bg-cyan-400/30 rounded-full transform transition-all duration-1000 ease-out delay-1000 ${
                  mounted
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-10 scale-0 opacity-0"
                }`}
              ></div>
              <div
                className={`absolute bottom-1/2 left-1/3 w-4 h-4 bg-yellow-400/30 rounded-full transform transition-all duration-1000 ease-out delay-700 ${
                  mounted
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-x-8 scale-0 opacity-0"
                }`}
              ></div>
              <div
                className={`absolute top-2/3 left-1/2 w-5 h-5 bg-magenta-400/30 rounded-full transform transition-all duration-1000 ease-out delay-1000 ${
                  mounted
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-6 scale-0 opacity-0"
                }`}
              ></div>

              {/* Paper Sheets */}
              <div
                className={`absolute top-1/3 right-1/5 w-32 h-40 bg-white/5 border border-white/10 rounded-lg transform transition-all duration-1000 ease-out delay-300 ${
                  mounted
                    ? "rotate-12 translate-y-0 opacity-100"
                    : "rotate-0 translate-y-8 opacity-0"
                }`}
              ></div>
              <div
                className={`absolute bottom-1/4 left-1/5 w-24 h-32 bg-white/5 border border-white/10 rounded-lg transform transition-all duration-1000 ease-out delay-800 ${
                  mounted
                    ? "rotate-[-8deg] translate-x-0 opacity-100"
                    : "rotate-0 translate-x-6 opacity-0"
                }`}
              ></div>

              {/* Color Swatches */}
              <div
                className={`absolute top-1/5 left-2/3 flex space-x-1 transform transition-all duration-1000 ease-out delay-600 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="w-3 h-8 bg-cyan-400/40 rounded-full"></div>
                <div className="w-3 h-8 bg-magenta-400/40 rounded-full"></div>
                <div className="w-3 h-8 bg-yellow-400/40 rounded-full"></div>
                <div className="w-3 h-8 bg-black/40 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
                  <span
                    className={`block transform transition-all duration-1000 ease-out ${
                      mounted
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    Ganpathi
                  </span>
                  <span
                    className={`block text-slate-300 transform transition-all duration-1000 ease-out delay-300 ${
                      mounted
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    Overseas
                  </span>
                </h1>
              </div>

              <div
                className={`transform transition-all duration-1000 ease-out delay-600 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto font-light leading-relaxed">
                  Elevating Print Excellence Through Innovation
                </p>
                <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
                  20+ years of precision craftsmanship, cutting-edge technology,
                  and unwavering commitment to quality
                </p>
              </div>

              <div
                className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 ease-out delay-700 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <a
                  href="#services"
                  className="bg-white text-blue-900 px-8 py-4 rounded-full font-medium hover:bg-slate-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Our Services
                </a>
                <a
                  href="#contact"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-blue-900 transition duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Moving Logo Bar - Enhanced with proper sizing and natural colors */}
        <section className="py-16 bg-white border-y border-gray-200 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                Trusted by Leading Brands
              </h2>
              <p className="text-lg text-gray-600">
                We're proud to serve these amazing companies
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className="animate-scroll flex items-center space-x-16 w-max">
                {clientLogos
                  .concat(clientLogos)
                  .concat(clientLogos)
                  .map((client, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="max-w-24 max-h-16 object-contain transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            .animate-scroll {
              animation: scroll 25s linear infinite;
            }

            @keyframes scroll {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-33.33%);
              }
            }
          `}</style>
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
                  Our design team helps bring your vision to life with
                  innovative and creative printing solutions.
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
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShareItem(item)}
                          className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200"
                          title="Share"
                        >
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

        {/* Testimonials Section - Enhanced with Navigation Buttons */}
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

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() =>
                      setCurrentSlide(
                        currentSlide === 0
                          ? testimonials.length - 1
                          : currentSlide - 1
                      )
                    }
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Navigation Dots */}
                  <div className="flex justify-center space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          currentSlide === index
                            ? "bg-yellow-400 scale-125"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentSlide((currentSlide + 1) % testimonials.length)
                    }
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
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
                  ISO certified processes ensuring consistent, high-quality
                  output every time.
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
                  Skilled professionals with decades of experience in the
                  printing industry.
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
    </>
  );
}
