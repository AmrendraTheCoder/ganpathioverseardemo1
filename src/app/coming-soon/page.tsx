import Link from "next/link";
import {
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Bell,
} from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-blue-600 text-2xl font-bold">GO</div>
          </div>
          <h1 className="text-white text-3xl font-bold">Ganpathi Overseas</h1>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4 text-white/80">
              <Facebook className="w-8 h-8" />
              <Twitter className="w-8 h-8" />
              <Instagram className="w-8 h-8" />
              <Linkedin className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Coming Soon
          </h2>

          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            We're working hard to bring you amazing content on our social media
            channels. Stay tuned for printing tips, behind-the-scenes content,
            and exclusive offers!
          </p>

          <div className="flex items-center justify-center space-x-2 text-white/80 mb-8">
            <Clock className="w-5 h-5" />
            <span>Expected Launch: Q2 2025</span>
          </div>

          {/* Notification Signup */}
          <div className="bg-white/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold">Get Notified</h3>
            </div>
            <p className="text-white/90 text-sm mb-4">
              Be the first to know when we launch our social media presence
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Notify Me
              </button>
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="text-white/80 mb-8">
            <p className="mb-4">In the meantime, connect with us through:</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a
                href="tel:+919651911111"
                className="hover:text-white transition-colors"
              >
                📞 +91 965 191 1111
              </a>
              <a
                href="mailto:info@ganpathioverseas.com"
                className="hover:text-white transition-colors"
              >
                ✉️ info@ganpathioverseas.com
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-white/60 text-sm mt-8">
          Follow our website for the latest updates and printing solutions
        </p>
      </div>
    </div>
  );
}
