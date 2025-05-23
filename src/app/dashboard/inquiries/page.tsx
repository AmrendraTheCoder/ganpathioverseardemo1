import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import InquiryList from "@/components/dashboard/inquiry-list";

export default async function InquiriesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch inquiries from Supabase
  const { data: inquiries, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Customer Inquiries</h1>
            <p className="text-gray-600 mt-2">
              Manage and respond to customer inquiries and quote requests.
            </p>
          </header>

          <InquiryList initialInquiries={inquiries || []} />
        </div>
      </main>
    </>
  );
}
