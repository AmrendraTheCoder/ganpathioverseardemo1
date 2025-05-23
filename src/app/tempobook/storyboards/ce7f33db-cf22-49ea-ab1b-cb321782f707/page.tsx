import MobileNav from "@/components/mobile-nav";

export default function MobileNavStoryboard() {
  // Sample user data
  const sampleUser = {
    id: "123",
    email: "user@example.com",
  };

  return (
    <div className="bg-white h-full">
      {/* Simulated mobile navbar */}
      <div className="w-full border-b border-gray-200 bg-white py-4 px-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-900">
            Ganpathi <span className="text-yellow-500">Overseas</span>
          </span>

          <MobileNav user={sampleUser} />
        </div>
      </div>

      <div className="p-4 text-center text-gray-600">
        <p>
          Click the menu button above to see the mobile navigation in action.
        </p>
        <p className="mt-2 text-sm">
          This component provides a responsive mobile menu with smooth
          animations.
        </p>
      </div>
    </div>
  );
}
