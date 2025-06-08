"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Sparkles,
  Star,
  Award,
} from "lucide-react";
import Image from "next/image";

interface PrintSample {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specifications: string[];
  featured?: boolean;
  rating?: number;
}

interface PrintSamplesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

const printSamples: PrintSample[] = [
  {
    id: "1",
    title: "Corporate Annual Report",
    category: "Offset Printing",
    image: "/images/gallery/corporate-brochure.jpg",
    description:
      "Premium quality annual report with perfect color reproduction and professional binding that elevates your corporate image.",
    specifications: [
      "300 GSM Premium Paper",
      "Perfect Binding",
      "Spot UV Coating",
      "Pantone Colors",
    ],
    featured: true,
    rating: 5,
  },
  {
    id: "2",
    title: "Business Card Collection",
    category: "Digital Printing",
    image: "/images/gallery/business-cards.jpg",
    description:
      "Elegant business cards with matte finish and embossed details that make lasting impressions.",
    specifications: [
      "350 GSM Card Stock",
      "Matte Lamination",
      "Spot UV",
      "Die Cut",
    ],
    featured: true,
    rating: 5,
  },
  {
    id: "3",
    title: "UV Coated Brochure",
    category: "UV Printing",
    image: "/images/gallery/brochure-design.jpg",
    description:
      "Vibrant brochure with UV coating for enhanced durability and visual appeal that captures attention.",
    specifications: [
      "250 GSM Art Paper",
      "UV Coating",
      "Tri-fold Design",
      "Weather Resistant",
    ],
    rating: 4,
  },
  {
    id: "4",
    title: "Large Format Banner",
    category: "Large Format",
    image: "/images/gallery/banner-design.jpg",
    description:
      "Eye-catching outdoor banner with weather-resistant printing for maximum visibility and impact.",
    specifications: [
      "Vinyl Material",
      "8ft x 4ft Size",
      "Outdoor Ink",
      "Grommets",
    ],
    rating: 5,
  },
  {
    id: "5",
    title: "Coffee Table Book",
    category: "Book Publishing",
    image: "/images/gallery/book-cover.jpg",
    description:
      "Premium coffee table book with hardcover binding and dust jacket for a luxurious reading experience.",
    specifications: [
      "Hardcover Binding",
      "Dust Jacket",
      "170 GSM Paper",
      "Perfect Binding",
    ],
    featured: true,
    rating: 5,
  },
  {
    id: "6",
    title: "Product Packaging",
    category: "Packaging",
    image: "/images/gallery/packaging-design.jpg",
    description:
      "Custom packaging design with structural integrity and brand appeal that protects and promotes your products.",
    specifications: [
      "Corrugated Board",
      "Food Safe Ink",
      "Custom Die Cut",
      "Eco-Friendly",
    ],
    rating: 4,
  },
  {
    id: "7",
    title: "Wedding Invitation Suite",
    category: "Digital Printing",
    image: "/images/gallery/wedding-card.jpg",
    description:
      "Elegant wedding invitation with gold foil and embossed details for your special day celebrations.",
    specifications: [
      "Pearl Finish Paper",
      "Gold Foil Stamping",
      "Embossing",
      "Custom Envelope",
    ],
    rating: 5,
  },
  {
    id: "8",
    title: "Restaurant Menu",
    category: "UV Printing",
    image: "/images/gallery/menu-design.jpg",
    description:
      "Durable restaurant menu with spill-resistant coating designed for high-traffic dining environments.",
    specifications: [
      "Synthetic Paper",
      "UV Coating",
      "Waterproof",
      "Tear Resistant",
    ],
    rating: 4,
  },
];

export default function PrintSamplesPopup({
  isOpen,
  onClose,
  serviceTitle,
}: PrintSamplesPopupProps) {
  const [selectedSample, setSelectedSample] = useState<PrintSample | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Filter samples based on service title
  const filteredSamples = printSamples.filter((sample) =>
    sample.category
      .toLowerCase()
      .includes(serviceTitle.toLowerCase().split(" ")[0])
  );

  const samplesToShow =
    filteredSamples.length > 0 ? filteredSamples : printSamples;

  const nextSample = () => {
    setCurrentIndex((prev) => (prev + 1) % samplesToShow.length);
  };

  const prevSample = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + samplesToShow.length) % samplesToShow.length
    );
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-t-3xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl transform transition-all duration-500 ease-out animate-slide-up">
        {/* Enhanced Header with Gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
          <div className="relative flex items-center justify-between p-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Print Samples Gallery
                </h2>
              </div>
              <p className="text-blue-100 text-lg">
                Explore our premium {serviceTitle.toLowerCase()} portfolio
              </p>
              <div className="flex items-center space-x-4 text-sm text-blue-200">
                <span className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Premium Quality</span>
                </span>
                <span>•</span>
                <span>{samplesToShow.length} Samples</span>
                <span>•</span>
                <span>Professional Work</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group p-3 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105"
            >
              <X className="w-6 h-6 text-white group-hover:text-blue-100" />
            </button>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-140px)] bg-gradient-to-br from-gray-50 to-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                </div>
              </div>
            </div>
          ) : selectedSample ? (
            /* Enhanced Detailed View */
            <div className="space-y-8">
              <button
                onClick={() => setSelectedSample(null)}
                className="group flex items-center text-blue-600 hover:text-blue-800 mb-6 px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Gallery
              </button>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Enhanced Image Section */}
                <div className="space-y-6">
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                    <Image
                      src={selectedSample.image}
                      alt={selectedSample.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {selectedSample.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Details Section */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium">
                      {selectedSample.category}
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                      {selectedSample.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      {renderStars(selectedSample.rating)}
                      <span className="text-sm text-gray-600">
                        ({selectedSample.rating}/5 Rating)
                      </span>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {selectedSample.description}
                    </p>
                  </div>

                  {/* Enhanced Specifications */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span>Specifications</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedSample.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="group relative bg-gradient-to-r from-white to-gray-50 border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-200 hover:border-blue-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            <span className="font-medium text-gray-800">
                              {spec}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 rounded-xl transition-all duration-200"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      View Full Details
                    </button>
                    <button className="group flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">
                      <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Download Sample
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Enhanced Gallery View */
            <div className="space-y-8">
              {/* Enhanced Featured Sample */}
              <div className="relative group">
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={samplesToShow[currentIndex].image}
                    alt={samplesToShow[currentIndex].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Featured Badge */}
                  {samplesToShow[currentIndex].featured && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 animate-pulse">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Featured Work</span>
                    </div>
                  )}

                  {/* Enhanced Content Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                        {samplesToShow[currentIndex].category}
                      </div>
                      {renderStars(samplesToShow[currentIndex].rating)}
                    </div>
                    <h3 className="text-3xl font-bold mb-3 leading-tight">
                      {samplesToShow[currentIndex].title}
                    </h3>
                    <p className="text-gray-200 max-w-2xl text-lg leading-relaxed">
                      {samplesToShow[currentIndex].description}
                    </p>
                  </div>
                </div>

                {/* Enhanced Navigation Buttons */}
                <button
                  onClick={prevSample}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={nextSample}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Progress Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {samplesToShow.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentIndex
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced Thumbnails Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    <span>Sample Collection</span>
                  </h4>
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {samplesToShow.length} Samples
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {samplesToShow.map((sample, index) => (
                    <div
                      key={sample.id}
                      className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        index === currentIndex
                          ? "ring-4 ring-blue-500 shadow-2xl"
                          : "hover:shadow-xl"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <Image
                        src={sample.image}
                        alt={sample.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {sample.featured && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-medium truncate">
                            {sample.title}
                          </div>
                          {renderStars(sample.rating)}
                        </div>
                        <div className="text-xs text-gray-300 truncate">
                          {sample.category}
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Section */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="space-y-4">
                  <h5 className="text-xl font-semibold text-gray-900">
                    Love what you see?
                  </h5>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Get detailed specifications and request a custom quote for
                    similar work.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                    <button
                      onClick={() =>
                        setSelectedSample(samplesToShow[currentIndex])
                      }
                      className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>View Sample Details</span>
                      </span>
                    </button>
                    <button className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">
                      <span className="flex items-center justify-center space-x-2">
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Request Quote</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
