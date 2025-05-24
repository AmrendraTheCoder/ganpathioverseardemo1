"use client";

import Image from "next/image";
import { useState } from "react";
import { imageUploadService } from "../utils/imageUpload";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 80,
  className = "",
  fill = false,
  priority = false,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get optimized URL if it's a Supabase image
  const optimizedSrc = imageUploadService.getOptimizedUrl(
    src,
    width,
    height,
    quality
  );

  // Fallback image
  const fallbackSrc = "/images/placeholder.jpg"; // You'll need to add this

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setImageError(true);
    setLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      <Image
        src={imageError ? fallbackSrc : optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        } ${fill ? "object-cover" : ""}`}
        onLoad={handleLoad}
        onError={handleError}
        sizes={fill ? "100vw" : `${width}px`}
      />
    </div>
  );
}

// Utility component for hero backgrounds
export function HeroBackground({
  src,
  alt = "Hero background",
  className = "",
  overlay = true,
}: {
  src: string;
  alt?: string;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        className="object-cover"
      />
      {overlay && <div className="absolute inset-0 bg-black/20"></div>}
    </div>
  );
}
