import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import BlogPostList from "@/components/dashboard/blog-post-list";

export default async function BlogManagementPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch blog posts from Supabase
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage your blog posts.
            </p>
          </header>

          <BlogPostList initialPosts={posts || []} />
        </div>
      </main>
    </>
  );
}
