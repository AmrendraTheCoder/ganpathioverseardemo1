import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

// Admin email addresses that can access the dashboard
const ADMIN_EMAILS = [
  "admin@ganpathioverseas.com",
  "owner@ganpathioverseas.com",
  "manager@ganpathioverseas.com",
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user email is in admin list
  if (!ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin dashboard. Please
            contact the administrator if you believe this is an error.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
