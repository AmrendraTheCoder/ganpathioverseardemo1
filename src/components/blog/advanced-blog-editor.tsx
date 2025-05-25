"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Tag,
  Globe,
  Search,
  Zap,
  BarChart3,
  Clock,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { createClient } from "../../../supabase/client";
import { toast } from "sonner";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  focus_keyword?: string;
  seo_score?: number;
  reading_time?: number;
  word_count?: number;
  featured?: boolean;
  status?: string;
  publish_date?: string;
  tags?: string[];
  alt_text?: string;
  image_caption?: string;
}

interface SEOAnalysis {
  score: number;
  issues: Array<{
    type: "error" | "warning" | "success";
    message: string;
    suggestion?: string;
  }>;
  keywords: {
    density: number;
    inTitle: boolean;
    inMeta: boolean;
    inHeadings: number;
  };
  readability: {
    score: number;
    level: string;
    avgSentenceLength: number;
    difficultWords: number;
  };
}

export default function AdvancedBlogEditor({
  initialPost,
  onSave,
  onClose,
}: {
  initialPost?: BlogPost;
  onSave: (post: BlogPost) => void;
  onClose: () => void;
}) {
  // Main post state
  const [post, setPost] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    author: "Admin",
    category: "General",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    focus_keyword: "",
    featured: false,
    status: "draft",
    tags: [],
    alt_text: "",
    image_caption: "",
    ...initialPost,
  });

  // Editor states
  const [activeTab, setActiveTab] = useState("content");
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis>({
    score: 0,
    issues: [],
    keywords: { density: 0, inTitle: false, inMeta: false, inHeadings: 0 },
    readability: {
      score: 0,
      level: "Easy",
      avgSentenceLength: 0,
      difficultWords: 0,
    },
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUploadType, setImageUploadType] = useState<"file" | "url">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentTag, setCurrentTag] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  // Auto-generate slug from title
  useEffect(() => {
    if (post.title && !initialPost) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setPost((prev) => ({ ...prev, slug }));
    }
  }, [post.title, initialPost]);

  // Auto-generate meta fields
  useEffect(() => {
    if (post.title && !post.meta_title) {
      setPost((prev) => ({ ...prev, meta_title: post.title }));
    }
    if (post.excerpt && !post.meta_description) {
      setPost((prev) => ({ ...prev, meta_description: post.excerpt }));
    }
  }, [post.title, post.excerpt]);

  // Real-time SEO analysis
  useEffect(() => {
    const analyzeContent = async () => {
      if (!post.title || !post.content) return;

      setIsAnalyzing(true);

      // Calculate word count and reading time
      const wordCount = post.content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      const readingTime = Math.ceil(wordCount / 200);

      // Analyze SEO factors
      const issues: SEOAnalysis["issues"] = [];
      let score = 0;

      // Title length check
      if (post.title.length < 30 || post.title.length > 60) {
        issues.push({
          type: "warning",
          message: "Title length should be between 30-60 characters",
          suggestion:
            post.title.length < 30
              ? "Make your title longer and more descriptive"
              : "Shorten your title to improve readability",
        });
      } else {
        score += 20;
        issues.push({
          type: "success",
          message: "Title length is optimal",
        });
      }

      // Meta description check
      if (!post.meta_description) {
        issues.push({
          type: "error",
          message: "Meta description is missing",
          suggestion:
            "Add a compelling meta description to improve click-through rates",
        });
      } else if (
        post.meta_description.length < 120 ||
        post.meta_description.length > 160
      ) {
        issues.push({
          type: "warning",
          message: "Meta description should be between 120-160 characters",
        });
      } else {
        score += 20;
        issues.push({
          type: "success",
          message: "Meta description length is optimal",
        });
      }

      // Focus keyword analysis
      let keywordAnalysis = {
        density: 0,
        inTitle: false,
        inMeta: false,
        inHeadings: 0,
      };
      if (post.focus_keyword) {
        const keyword = post.focus_keyword.toLowerCase();
        const contentText = post.content.replace(/<[^>]*>/g, "").toLowerCase();
        const keywordOccurrences = (
          contentText.match(new RegExp(keyword, "g")) || []
        ).length;
        keywordAnalysis.density = (keywordOccurrences / wordCount) * 100;
        keywordAnalysis.inTitle = post.title.toLowerCase().includes(keyword);
        keywordAnalysis.inMeta =
          post.meta_description?.toLowerCase().includes(keyword) || false;

        // Check headings
        const headingMatches =
          post.content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi) || [];
        keywordAnalysis.inHeadings = headingMatches.filter((heading) =>
          heading.toLowerCase().includes(keyword)
        ).length;

        // Keyword scoring
        if (keywordAnalysis.inTitle) score += 15;
        if (keywordAnalysis.inMeta) score += 10;
        if (keywordAnalysis.inHeadings > 0) score += 10;
        if (keywordAnalysis.density >= 0.5 && keywordAnalysis.density <= 2.5) {
          score += 15;
          issues.push({
            type: "success",
            message: `Focus keyword density is optimal (${keywordAnalysis.density.toFixed(1)}%)`,
          });
        }
      }

      // Content length check
      if (wordCount < 300) {
        issues.push({
          type: "error",
          message: "Content is too short for good SEO",
          suggestion: "Aim for at least 300 words to provide value to readers",
        });
      } else if (wordCount > 1000) {
        score += 15;
        issues.push({
          type: "success",
          message: "Content length is excellent for SEO",
        });
      } else {
        score += 10;
        issues.push({
          type: "success",
          message: "Content length is good",
        });
      }

      // Image alt text check
      if (post.cover_image && !post.alt_text) {
        issues.push({
          type: "warning",
          message: "Cover image is missing alt text",
          suggestion:
            "Add descriptive alt text for better accessibility and SEO",
        });
      } else if (post.alt_text) {
        score += 10;
        issues.push({
          type: "success",
          message: "Cover image has alt text",
        });
      }

      // Tags check
      if (!post.tags || post.tags.length === 0) {
        issues.push({
          type: "warning",
          message: "No tags added",
          suggestion: "Add 3-8 relevant tags to improve discoverability",
        });
      } else if (post.tags.length > 8) {
        issues.push({
          type: "warning",
          message: "Too many tags",
          suggestion: "Reduce to 3-8 most relevant tags",
        });
      } else {
        score += 10;
        issues.push({
          type: "success",
          message: "Tags are well-optimized",
        });
      }

      // Update post with calculated values
      setPost((prev) => ({
        ...prev,
        word_count: wordCount,
        reading_time: readingTime,
        seo_score: score,
      }));

      setSeoAnalysis({
        score,
        issues,
        keywords: keywordAnalysis,
        readability: {
          score: 85,
          level: "Easy",
          avgSentenceLength: 15,
          difficultWords: 5,
        },
      });

      setIsAnalyzing(false);
    };

    const debounceTimer = setTimeout(analyzeContent, 1000);
    return () => clearTimeout(debounceTimer);
  }, [
    post.title,
    post.content,
    post.meta_description,
    post.focus_keyword,
    post.alt_text,
    post.tags,
  ]);

  // Handle image upload
  const handleImageUpload = async (file?: File) => {
    try {
      setUploadProgress(0);

      if (imageUploadType === "url") {
        // Validate URL
        if (!imageUrl) {
          toast.error("Please enter an image URL");
          return;
        }

        // Test if URL is accessible
        const img = new Image();
        img.onload = () => {
          setPost((prev) => ({ ...prev, cover_image: imageUrl }));
          setShowImageUpload(false);
          setImageUrl("");
          toast.success("Image URL added successfully!");
        };
        img.onerror = () => {
          toast.error("Invalid image URL or image not accessible");
        };
        img.src = imageUrl;
      } else if (file) {
        // Upload file to Supabase storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `blog-images/${fileName}`;

        const { data, error } = await supabase.storage
          .from("blog-images")
          .upload(filePath, file);

        if (error) throw error;

        // Simulate progress for user feedback
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        // Complete progress after upload
        setTimeout(() => {
          setUploadProgress(100);
          clearInterval(progressInterval);
        }, 500);

        const {
          data: { publicUrl },
        } = supabase.storage.from("blog-images").getPublicUrl(filePath);

        // Save to media library
        await supabase.from("media_library").insert([
          {
            filename: fileName,
            original_name: file.name,
            file_type: file.type,
            file_size: file.size,
            url: publicUrl,
            uploaded_by: post.author,
          },
        ]);

        setPost((prev) => ({ ...prev, cover_image: publicUrl }));
        setShowImageUpload(false);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadProgress(0);
    }
  };

  // Add tag
  const addTag = () => {
    if (currentTag && !post.tags?.includes(currentTag)) {
      setPost((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag],
      }));
      setCurrentTag("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  // Format text
  const formatText = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = `<strong>${selectedText || "bold text"}</strong>`;
        break;
      case "italic":
        formattedText = `<em>${selectedText || "italic text"}</em>`;
        break;
      case "h1":
        formattedText = `<h1>${selectedText || "Heading 1"}</h1>`;
        break;
      case "h2":
        formattedText = `<h2>${selectedText || "Heading 2"}</h2>`;
        break;
      case "h3":
        formattedText = `<h3>${selectedText || "Heading 3"}</h3>`;
        break;
      case "ul":
        formattedText = `<ul><li>${selectedText || "List item"}</li></ul>`;
        break;
      case "ol":
        formattedText = `<ol><li>${selectedText || "List item"}</li></ol>`;
        break;
      case "quote":
        formattedText = `<blockquote>${selectedText || "Quote text"}</blockquote>`;
        break;
      case "code":
        formattedText = `<code>${selectedText || "code"}</code>`;
        break;
      case "link":
        const url = prompt("Enter URL:");
        if (url) {
          formattedText = `<a href="${url}">${selectedText || "link text"}</a>`;
        }
        break;
    }

    if (formattedText) {
      const newContent =
        post.content.substring(0, start) +
        formattedText +
        post.content.substring(end);

      setPost((prev) => ({ ...prev, content: newContent }));
    }
  };

  // Save post
  const handleSave = async (status: string = post.status || "draft") => {
    if (!post.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSaving(true);

    try {
      const postData = {
        ...post,
        status,
        publish_date:
          status === "published" ? new Date().toISOString() : post.publish_date,
        last_modified: new Date().toISOString(),
      };

      if (initialPost?.id) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", initialPost.id);

        if (error) throw error;
        toast.success("Post updated successfully!");
      } else {
        // Create new post
        const { data, error } = await supabase
          .from("blog_posts")
          .insert([postData])
          .select()
          .single();

        if (error) throw error;
        setPost(data);
        toast.success("Post created successfully!");
      }

      onSave(postData);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialPost ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-gray-600">
            Create SEO-optimized content with real-time analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="bg-blue-900 hover:bg-blue-800"
          >
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* SEO Score Dashboard */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              SEO Analysis
              {isAnalyzing && (
                <Sparkles className="w-4 h-4 ml-2 animate-spin" />
              )}
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${getSeoScoreColor(seoAnalysis.score)}`}
                >
                  {seoAnalysis.score}/100
                </div>
                <div className="text-sm text-gray-500">SEO Score</div>
              </div>
              <div className="w-16 h-16">
                <svg className="transform -rotate-90 w-16 h-16">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - seoAnalysis.score / 100)}`}
                    className={getSeoScoreColor(seoAnalysis.score)}
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold">
                {post.word_count || 0}
              </div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold">
                {post.reading_time || 0} min
              </div>
              <div className="text-sm text-gray-600">Reading Time</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold">
                {seoAnalysis.keywords.density.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Keyword Density</div>
            </div>
          </div>

          <div className="space-y-2">
            {seoAnalysis.issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 rounded-lg bg-gray-50"
              >
                {issue.type === "success" && (
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                )}
                {issue.type === "warning" && (
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                )}
                {issue.type === "error" && (
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium">{issue.message}</div>
                  {issue.suggestion && (
                    <div className="text-xs text-gray-600 mt-1">
                      {issue.suggestion}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Editor</CardTitle>
                  <CardDescription>
                    Write your blog post content with rich formatting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={post.title}
                      onChange={(e) =>
                        setPost((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Enter an engaging title..."
                      className="text-lg font-semibold"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {post.title.length}/60 characters
                    </div>
                  </div>

                  {/* Slug */}
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={post.slug}
                      onChange={(e) =>
                        setPost((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="url-friendly-slug"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={post.excerpt}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          excerpt: e.target.value,
                        }))
                      }
                      placeholder="Write a compelling excerpt..."
                      rows={3}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {post.excerpt.length}/160 characters
                    </div>
                  </div>

                  {/* Content Editor Toolbar */}
                  <div className="border rounded-lg">
                    <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("bold")}
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("italic")}
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("h1")}
                      >
                        <Heading1 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("h2")}
                      >
                        <Heading2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("h3")}
                      >
                        <Heading3 className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("ul")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("ol")}
                      >
                        <ListOrdered className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("quote")}
                      >
                        <Quote className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("code")}
                      >
                        <Code className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => formatText("link")}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    <Textarea
                      ref={contentRef}
                      value={post.content}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Start writing your amazing content..."
                      rows={20}
                      className="border-0 resize-none focus:ring-0"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Optimization</CardTitle>
                  <CardDescription>
                    Optimize your post for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Focus Keyword */}
                  <div>
                    <Label htmlFor="focus_keyword">Focus Keyword</Label>
                    <Input
                      id="focus_keyword"
                      value={post.focus_keyword || ""}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          focus_keyword: e.target.value,
                        }))
                      }
                      placeholder="Enter your target keyword..."
                    />
                    {post.focus_keyword && (
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${seoAnalysis.keywords.inTitle ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <span>
                            In title:{" "}
                            {seoAnalysis.keywords.inTitle ? "Yes" : "No"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${seoAnalysis.keywords.inMeta ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <span>
                            In meta description:{" "}
                            {seoAnalysis.keywords.inMeta ? "Yes" : "No"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${seoAnalysis.keywords.inHeadings > 0 ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <span>
                            In headings: {seoAnalysis.keywords.inHeadings}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${seoAnalysis.keywords.density >= 0.5 && seoAnalysis.keywords.density <= 2.5 ? "bg-green-500" : "bg-yellow-500"}`}
                          />
                          <span>
                            Density: {seoAnalysis.keywords.density.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Meta Title */}
                  <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      value={post.meta_title || ""}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          meta_title: e.target.value,
                        }))
                      }
                      placeholder="SEO-optimized title for search results..."
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {(post.meta_title || "").length}/60 characters
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      value={post.meta_description || ""}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          meta_description: e.target.value,
                        }))
                      }
                      placeholder="Compelling description for search results..."
                      rows={3}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {(post.meta_description || "").length}/160 characters
                    </div>
                  </div>

                  {/* Meta Keywords */}
                  <div>
                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                    <Input
                      id="meta_keywords"
                      value={post.meta_keywords || ""}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          meta_keywords: e.target.value,
                        }))
                      }
                      placeholder="keyword1, keyword2, keyword3..."
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a tag..."
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                      />
                      <Button onClick={addTag} disabled={!currentTag}>
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Media & Images</CardTitle>
                  <CardDescription>
                    Manage your post images and media
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cover Image */}
                  <div>
                    <Label>Cover Image</Label>
                    {post.cover_image ? (
                      <div className="relative">
                        <img
                          src={post.cover_image}
                          alt="Cover"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            setPost((prev) => ({ ...prev, cover_image: "" }))
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <Button onClick={() => setShowImageUpload(true)}>
                          <Upload className="w-4 h-4 mr-2" />
                          Add Cover Image
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Alt Text */}
                  <div>
                    <Label htmlFor="alt_text">Alt Text</Label>
                    <Input
                      id="alt_text"
                      value={post.alt_text || ""}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          alt_text: e.target.value,
                        }))
                      }
                      placeholder="Describe the image for accessibility..."
                    />
                  </div>

                  {/* Image Caption */}
                  <div>
                    <Label htmlFor="image_caption">Image Caption</Label>
                    <Input
                      id="image_caption"
                      value={post.image_caption || ""}
                      onChange={(e) =>
                        setPost((prev) => ({
                          ...prev,
                          image_caption: e.target.value,
                        }))
                      }
                      placeholder="Optional caption for the image..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                  <CardDescription>
                    Configure publishing and display options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category */}
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={post.category}
                      onValueChange={(value) =>
                        setPost((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Printing Techniques">
                          Printing Techniques
                        </SelectItem>
                        <SelectItem value="Industry News">
                          Industry News
                        </SelectItem>
                        <SelectItem value="Tips & Guides">
                          Tips & Guides
                        </SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={post.author}
                      onChange={(e) =>
                        setPost((prev) => ({ ...prev, author: e.target.value }))
                      }
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={post.status}
                      onValueChange={(value) =>
                        setPost((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Featured */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={post.featured}
                      onCheckedChange={(checked) =>
                        setPost((prev) => ({ ...prev, featured: checked }))
                      }
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>

                  {/* Publish Date */}
                  {post.status === "scheduled" && (
                    <div>
                      <Label htmlFor="publish_date">Publish Date</Label>
                      <Input
                        id="publish_date"
                        type="datetime-local"
                        value={
                          post.publish_date
                            ? new Date(post.publish_date)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                        onChange={(e) =>
                          setPost((prev) => ({
                            ...prev,
                            publish_date: new Date(
                              e.target.value
                            ).toISOString(),
                          }))
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full"
                onClick={() => handleSave("published")}
              >
                <Globe className="w-4 h-4 mr-2" />
                Publish Now
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSave("draft")}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </CardContent>
          </Card>

          {/* Content Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Words</span>
                <span className="font-medium">{post.word_count || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reading Time</span>
                <span className="font-medium">
                  {post.reading_time || 0} min
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Characters</span>
                <span className="font-medium">{post.content.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Paragraphs</span>
                <span className="font-medium">
                  {post.content.split("\n").filter((p) => p.trim()).length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* SEO Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                {
                  check: post.title.length >= 30 && post.title.length <= 60,
                  label: "Title length (30-60 chars)",
                },
                {
                  check:
                    post.meta_description &&
                    post.meta_description.length >= 120 &&
                    post.meta_description.length <= 160,
                  label: "Meta description (120-160 chars)",
                },
                {
                  check: post.focus_keyword && seoAnalysis.keywords.inTitle,
                  label: "Focus keyword in title",
                },
                {
                  check: post.alt_text && post.alt_text.length > 0,
                  label: "Image alt text",
                },
                {
                  check: post.tags && post.tags.length >= 3,
                  label: "At least 3 tags",
                },
                {
                  check: (post.word_count || 0) >= 300,
                  label: "Minimum 300 words",
                },
                {
                  check: post.cover_image && post.cover_image.length > 0,
                  label: "Cover image added",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.check ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span
                    className={`text-sm ${item.check ? "text-green-700" : "text-gray-600"}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Upload Modal */}
      <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Cover Image</DialogTitle>
            <DialogDescription>
              Upload an image or provide a URL
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={imageUploadType}
            onValueChange={(value: any) => setImageUploadType(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Image URL</TabsTrigger>
              <TabsTrigger value="file">Upload File</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button onClick={() => handleImageUpload()} className="w-full">
                Add Image
              </Button>
            </TabsContent>

            <TabsContent value="file" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                </label>
              </div>
              {uploadProgress > 0 && (
                <Progress value={uploadProgress} className="w-full" />
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      {showPreview && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post Preview</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.alt_text}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              <div className="space-y-2">
                <Badge>{post.category}</Badge>
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-gray-600">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{post.reading_time} min read</span>
                  <span>{post.word_count} words</span>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
