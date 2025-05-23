import MobileNav from "@/components/mobile-nav";
import { Phone } from "lucide-react";

export default function MobileResponsiveNav() {
  // Sample user data for testing
  const sampleUser = {
    id: "123",
    email: "user@ganpathioverseas.com",
  };

  return (
    <div className="bg-white h-full max-w-sm mx-auto border border-gray-200 rounded-lg overflow-hidden">
      {/* Mobile Header */}
      <div className="w-full border-b border-gray-200 bg-white py-4 px-4 navbar-blur">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-900">
            Ganpathi <span className="text-yellow-500">Overseas</span>
          </span>

          <MobileNav user={sampleUser} />
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Mobile Navigation Demo</h2>
          <p className="text-sm text-gray-600">
            Tap the menu button above to see the responsive mobile navigation in
            action.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Features:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Smooth slide-in animation</li>
            <li>• Touch-friendly interface</li>
            <li>• User authentication state</li>
            <li>• Quick contact access</li>
            <li>• Responsive design</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-900 mb-2">
            <Phone className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Quick Contact</span>
          </div>
          <p className="text-xs text-blue-700">
            Phone number is easily accessible in the mobile menu for immediate
            contact.
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            ✓ Production Ready
          </div>
        </div>
      </div>
    </div>
  );
}
