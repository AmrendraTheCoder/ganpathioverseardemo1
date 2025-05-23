"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl animate-pulse">
                G
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-gray-700 font-medium">Loading...</p>
            </div>
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 animate-[loading_0.8s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}
