"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import Image from "next/image";

interface PrintSample {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specifications: string[];
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
      "Premium quality annual report with perfect color reproduction and professional binding.",
    specifications: [
      "300 GSM Paper",
      "Perfect Binding",
      "Spot UV Coating",
      "Pantone Colors",
    ],
  },
  {
    id: "2",
    title: "Business Card Collection",
    category: "Digital Printing",
    image: "/images/gallery/business-cards.jpg",
    description:
      "Elegant business cards with matte finish and embossed details.",
    specifications: [
      "350 GSM Card Stock",
      "Matte Lamination",
      "Spot UV",
      "Die Cut",
    ],
  },
  {
    id: "3",
    title: "UV Coated Brochure",
    category: "UV Printing",
    image: "/images/gallery/brochure-design.jpg",
    description:
      "Vibrant brochure with UV coating for enhanced durability and visual appeal.",
    specifications: [
      "250 GSM Art Paper",
      "UV Coating",
      "Tri-fold Design",
      "Weather Resistant",
    ],
  },
  {
    id: "4",
    title: "Large Format Banner",
    category: "Large Format",
    image: "/images/gallery/banner-design.jpg",
    description: "Eye-catching outdoor banner with weather-resistant printing.",
    specifications: [
      "Vinyl Material",
      "8ft x 4ft Size",
      "Outdoor Ink",
      "Grommets",
    ],
  },
  {
    id: "5",
    title: "Coffee Table Book",
    category: "Book Publishing",
    image: "/images/gallery/book-cover.jpg",
    description:
      "Premium coffee table book with hardcover binding and dust jacket.",
    specifications: [
      "Hardcover Binding",
      "Dust Jacket",
      "170 GSM Paper",
      "Perfect Binding",
    ],
  },
  {
    id: "6",
    title: "Product Packaging",
    category: "Packaging",
    image: "/images/gallery/packaging-design.jpg",
    description:
      "Custom packaging design with structural integrity and brand appeal.",
    specifications: [
      "Corrugated Board",
      "Food Safe Ink",
      "Custom Die Cut",
      "Eco-Friendly",
    ],
  },
  {
    id: "7",
    title: "Wedding Invitation Suite",
    category: "Digital Printing",
    image: "/images/gallery/wedding-card.jpg",
    description:
      "Elegant wedding invitation with gold foil and embossed details.",
    specifications: [
      "Pearl Finish Paper",
      "Gold Foil Stamping",
      "Embossing",
      "Custom Envelope",
    ],
  },
  {
    id: "8",
    title: "Restaurant Menu",
    category: "UV Printing",
    image: "/images/gallery/menu-design.jpg",
    description: "Durable restaurant menu with spill-resistant coating.",
    specifications: [
      "Synthetic Paper",
      "UV Coating",
      "Waterproof",
      "Tear Resistant",
    ],
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Print Samples</h2>
            <p className="text-gray-600">
              Explore our {serviceTitle.toLowerCase()} work
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {selectedSample ? (
            /* Detailed View */
            <div className="space-y-6">
              <button
                onClick={() => setSelectedSample(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Gallery
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={selectedSample.image}
                    alt={selectedSample.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {selectedSample.category}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedSample.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {selectedSample.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3 text-gray-900">
                      Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedSample.specifications.map((spec, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                      <Eye className="w-5 h-5 mr-2" />
                      View Details
                    </button>
                    <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Gallery View */
            <div className="space-y-6">
              {/* Featured Sample */}
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={samplesToShow[currentIndex].image}
                    alt={samplesToShow[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-sm font-medium text-blue-200 mb-2">
                      {samplesToShow[currentIndex].category}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {samplesToShow[currentIndex].title}
                    </h3>
                    <p className="text-gray-200 max-w-md">
                      {samplesToShow[currentIndex].description}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <button
                  onClick={prevSample}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSample}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {samplesToShow.map((sample, index) => (
                  <div
                    key={sample.id}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                      index === currentIndex
                        ? "ring-4 ring-blue-500"
                        : "hover:scale-105"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <Image
                      src={sample.image}
                      alt={sample.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="text-xs font-medium truncate">
                        {sample.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedSample(samplesToShow[currentIndex])}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  View Sample Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
