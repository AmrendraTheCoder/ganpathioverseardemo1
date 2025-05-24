"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Edit,
  Trash2,
  Plus,
  Loader2,
  Image as ImageIcon,
  Eye,
  RefreshCw,
  ExternalLink,
  FileText,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  created_at: string;
  slug: string;
};

export default function BlogPostList({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    cover_image: "",
    author: "",
    category: "",
    slug: "",
  });

  const supabase = createClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("blog-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          console.log("Real-time blog update:", payload);
          refreshPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Refresh posts from database
  const refreshPosts = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error refreshing posts:", error);
      toast.error("Failed to refresh blog posts");
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const openNewPostDialog = () => {
    setSelectedPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      cover_image:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80",
      author: "Admin",
      category: "",
      slug: "",
    });
    setIsDialogOpen(true);
  };

  const openEditPostDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image,
      author: post.author,
      category: post.category,
      slug: post.slug,
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedPost) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            cover_image: formData.cover_image,
            author: formData.author,
            category: formData.category,
            slug: formData.slug,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedPost.id);

        if (error) throw error;

        // Update local state
        setPosts((prev) =>
          prev.map((post) =>
            post.id === selectedPost.id ? { ...post, ...formData } : post
          )
        );

        toast.success("Blog post updated successfully!");
      } else {
        // Create new post
        const { data, error } = await supabase
          .from("blog_posts")
          .insert([
            {
              title: formData.title,
              excerpt: formData.excerpt,
              content: formData.content,
              cover_image: formData.cover_image,
              author: formData.author,
              category: formData.category,
              slug: formData.slug,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) throw error;

        // Update local state
        if (data) {
          setPosts((prev) => [data[0], ...prev]);
        }

        toast.success("Blog post created successfully!");
      }

      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Error saving blog post:", error);
      toast.error(error.message || "Failed to save blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", selectedPost.id);

      if (error) throw error;

      // Update local state
      setPosts((prev) => prev.filter((post) => post.id !== selectedPost.id));

      toast.success("Blog post deleted successfully!");
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error("Error deleting blog post:", error);
      toast.error(error.message || "Failed to delete blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPostStats = () => {
    const categories = Array.from(new Set(posts.map((post) => post.category)));
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const thisMonthPosts = posts.filter((post) => {
      const postDate = new Date(post.created_at);
      return (
        postDate.getMonth() === thisMonth && postDate.getFullYear() === thisYear
      );
    }).length;

    return {
      total: posts.length,
      categories: categories.length,
      thisMonth: thisMonthPosts,
    };
  };

  const stats = getPostStats();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">Blog Posts</h2>
          <Button
            onClick={refreshPosts}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
        <Button
          onClick={openNewPostDialog}
          className="bg-blue-900 hover:bg-blue-800"
        >
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Posts</p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.total}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">This Month</p>
                <p className="text-2xl font-bold text-green-900">
                  {stats.thisMonth}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Categories</p>
                <p className="text-2xl font-bold text-purple-900">
                  {stats.categories}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No blog posts found
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first blog post to get started.
          </p>
          <Button
            onClick={openNewPostDialog}
            className="bg-blue-900 hover:bg-blue-800"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      post.cover_image ||
                      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.created_at)}
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {post.category}
                    </div>
                    <div className="text-sm text-gray-500">
                      By {post.author}
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {post.excerpt}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Post
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditPostDialog(post)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openDeleteDialog(post)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPost ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {selectedPost
                ? "Make changes to your blog post."
                : "Fill in the details for your new blog post."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="post-url-slug"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Printing Tips"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <div className="flex gap-2">
                  <Input
                    name="cover_image"
                    value={formData.cover_image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="flex-1"
                  />
                  {formData.cover_image && (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border">
                      <Image
                        src={formData.cover_image}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary of the post"
                  required
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Full post content (HTML supported)"
                  required
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 hover:bg-blue-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : selectedPost ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedPost?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
