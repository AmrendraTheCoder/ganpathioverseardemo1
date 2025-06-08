interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
}

export default function LoadingSkeleton({
  className = "",
  rows = 1,
}: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-md h-4 mb-2 last:mb-0"
        ></div>
      ))}
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-gray-200 rounded-lg h-48"></div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white animate-pulse">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-2xl mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded-lg mb-8 max-w-lg mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-32 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
