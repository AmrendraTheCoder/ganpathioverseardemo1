"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Tag,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Sample blog posts data
const samplePosts = [
  {
    id: "1",
    title:
      "The Complete Guide to Offset Printing: Quality That Makes a Difference",
    slug: "complete-guide-offset-printing",
    excerpt:
      "Discover why offset printing remains the gold standard for high-volume, professional printing projects. Learn about the process, benefits, and when to choose offset over digital printing.",
    content: `
      <h2>What is Offset Printing?</h2>
      <p>Offset printing is a commonly used printing technique where the inked image is transferred (or "offset") from a plate to a rubber cylinder, then to the printing surface. This indirect printing method is widely used for high-volume commercial printing.</p>
      
      <h2>The Offset Printing Process</h2>
      <p>The process involves several key steps that ensure consistent, high-quality results:</p>
      <ol>
        <li><strong>Plate Creation:</strong> A printing plate is created for each color (typically CMYK - Cyan, Magenta, Yellow, and Key/Black).</li>
        <li><strong>Ink Application:</strong> Ink is applied to the printing plate, which then transfers to a rubber cylinder.</li>
        <li><strong>Image Transfer:</strong> The rubber cylinder transfers the ink to the paper or other substrate.</li>
        <li><strong>Finishing:</strong> Additional processes like cutting, folding, or binding complete the job.</li>
      </ol>
      
      <h2>Advantages of Offset Printing</h2>
      <p>Offset printing offers numerous benefits that make it the preferred choice for many printing projects:</p>
      <ul>
        <li><strong>Superior Quality:</strong> Produces sharp, consistent images with excellent color reproduction.</li>
        <li><strong>Cost-Effective for Large Runs:</strong> The more you print, the lower the cost per piece.</li>
        <li><strong>Versatile Paper Options:</strong> Compatible with a wide range of paper types and weights.</li>
        <li><strong>Pantone Color Matching:</strong> Accurate reproduction of specific brand colors.</li>
        <li><strong>Professional Finishing:</strong> Supports various finishing options like UV coating and embossing.</li>
      </ul>
      
      <h2>When to Choose Offset Printing</h2>
      <p>Offset printing is ideal for:</p>
      <ul>
        <li>Large quantity runs (typically 500+ pieces)</li>
        <li>High-quality marketing materials</li>
        <li>Books and magazines</li>
        <li>Packaging and labels</li>
        <li>Stationery and business cards</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>While digital printing has its place in the modern printing landscape, offset printing continues to be the gold standard for projects requiring the highest quality and best value for large quantities. At Ganpathi Overseas, our state-of-the-art offset presses ensure your projects are completed with precision and excellence.</p>
    `,
    cover_image: "/images/blog/offset-printing-guide.jpg",
    author: "Onkar",
    category: "Printing Techniques",
    created_at: "2024-01-15T10:00:00Z",
    view_count: 1250,
    like_count: 85,
    comment_count: 23,
    share_count: 45,
    reading_time: 8,
    featured: true,
    status: "published",
    tags: ["offset printing", "printing techniques", "quality"],
  },
  {
    id: "2",
    title:
      "Digital Printing Revolution: Speed Meets Quality in Modern Business",
    slug: "digital-printing-revolution",
    excerpt:
      "Explore how digital printing technology has transformed the industry, offering quick turnarounds and customization options that were previously impossible.",
    content: `
      <h2>The Digital Printing Revolution</h2>
      <p>Digital printing has revolutionized the printing industry by eliminating many of the traditional steps required in offset printing. Instead of creating plates, digital printers directly apply ink or toner to the substrate using digital files.</p>
      
      <h2>How Digital Printing Works</h2>
      <p>Digital printing technology uses either inkjet or laser printing methods:</p>
      <ul>
        <li><strong>Inkjet Printing:</strong> Sprays tiny droplets of ink directly onto the substrate</li>
        <li><strong>Laser Printing:</strong> Uses electrostatic charges to attract toner particles to specific areas</li>
      </ul>
      
      <h2>Advantages of Digital Printing</h2>
      <ul>
        <li><strong>Fast Turnaround:</strong> No plate creation means quicker setup times</li>
        <li><strong>Variable Data Printing:</strong> Each piece can be different (personalization)</li>
        <li><strong>Cost-Effective for Small Runs:</strong> No setup costs make small quantities affordable</li>
        <li><strong>Instant Proofing:</strong> See results immediately and make adjustments</li>
        <li><strong>Environmental Benefits:</strong> Less waste and fewer chemicals</li>
      </ul>
      
      <h2>Applications of Digital Printing</h2>
      <p>Digital printing excels in:</p>
      <ul>
        <li>Short-run marketing materials</li>
        <li>Personalized direct mail</li>
        <li>Prototypes and samples</li>
        <li>On-demand publishing</li>
        <li>Event materials with tight deadlines</li>
      </ul>
      
      <h2>The Future is Digital</h2>
      <p>As technology continues to advance, digital printing quality continues to improve while costs decrease. At Ganpathi Overseas, we've invested in the latest digital printing technology to offer our clients the best of both worlds - speed and quality.</p>
    `,
    cover_image: "/images/blog/digital-printing.jpg",
    author: "Amit Patel",
    category: "Industry News",
    created_at: "2024-01-10T14:30:00Z",
    view_count: 980,
    like_count: 67,
    comment_count: 18,
    share_count: 32,
    reading_time: 6,
    featured: true,
    status: "published",
    tags: ["digital printing", "technology", "business"],
  },
  {
    id: "3",
    title: "Choosing the Right Paper: A Designer's Guide to Print Materials",
    slug: "choosing-right-paper-guide",
    excerpt:
      "Paper selection can make or break your print project. Learn about different paper types, weights, and finishes to make informed decisions for your next print job.",
    content: `
      <h2>The Foundation of Great Printing: Paper Selection</h2>
      <p>Choosing the right paper is one of the most critical decisions in any printing project. The paper you select affects not only the visual appeal of your printed material but also its durability, cost, and environmental impact.</p>
      
      <h2>Understanding Paper Weight</h2>
      <p>Paper weight is measured in GSM (grams per square meter) and affects both feel and durability:</p>
      <ul>
        <li><strong>80-120 GSM:</strong> Standard office paper, suitable for everyday documents</li>
        <li><strong>130-170 GSM:</strong> Medium weight, good for flyers and brochures</li>
        <li><strong>200-300 GSM:</strong> Heavy weight, ideal for business cards and covers</li>
        <li><strong>350+ GSM:</strong> Board weight, used for packaging and premium cards</li>
      </ul>
      
      <h2>Paper Types and Their Applications</h2>
      <h3>Coated Papers</h3>
      <ul>
        <li><strong>Gloss Coated:</strong> High shine, excellent for vibrant photos</li>
        <li><strong>Matte Coated:</strong> Smooth finish without glare, sophisticated look</li>
        <li><strong>Silk/Satin:</strong> Balance between gloss and matte</li>
      </ul>
      
      <h3>Uncoated Papers</h3>
      <ul>
        <li><strong>Offset/Bond:</strong> Standard office paper, economical choice</li>
        <li><strong>Textured:</strong> Linen, laid, or felt finishes for premium feel</li>
        <li><strong>Recycled:</strong> Environmentally conscious option</li>
      </ul>
      
      <h2>Specialty Papers</h2>
      <p>For unique projects, consider these specialty options:</p>
      <ul>
        <li><strong>Synthetic Papers:</strong> Waterproof and tear-resistant</li>
        <li><strong>Metallic Papers:</strong> Eye-catching shimmer effect</li>
        <li><strong>Security Papers:</strong> For certificates and important documents</li>
      </ul>
      
      <h2>Making the Right Choice</h2>
      <p>Consider these factors when selecting paper:</p>
      <ol>
        <li>Project purpose and audience</li>
        <li>Budget constraints</li>
        <li>Printing method compatibility</li>
        <li>Environmental considerations</li>
        <li>Finishing requirements</li>
      </ol>
      
      <p>At Ganpathi Overseas, our experts can help you choose the perfect paper for your project, ensuring optimal results within your budget.</p>
    `,
    cover_image: "/images/blog/paper-selection.jpg",
    author: "Subodh Sharma",
    category: "Tips & Guides",
    created_at: "2024-01-05T09:15:00Z",
    view_count: 750,
    like_count: 52,
    comment_count: 15,
    share_count: 28,
    reading_time: 5,
    featured: false,
    status: "published",
    tags: ["paper selection", "design", "materials"],
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Find the blog post by slug
  const post = samplePosts.find((post) => post.slug === params.slug);

  if (!post) {
  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related posts (same category, different posts)
  const relatedPosts = samplePosts
    .filter(
      (relatedPost) =>
        relatedPost.category === post.category && relatedPost.id !== post.id
    )
    .slice(0, 3);

  const handleShare = async (platform?: string) => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (platform) {
      let shareUrl = "";
      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
          break;
        case "email":
          shareUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt + "\n\n" + window.location.href)}`;
          break;
      }
      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400");
      }
    } else if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />

      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="max-w-4xl mx-auto mb-8">
            <Link
              href="/blog"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>

            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-gray-700">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-between mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {post.reading_time} min read
                    </span>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.like_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comment_count}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    liked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                  <span>{liked ? "Liked" : "Like"}</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    bookmarked
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`}
                  />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 mr-2">Share:</span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("email")}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare()}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  title="More sharing options"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Related Articles
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-medium rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{relatedPost.author}</span>
                          <span className="text-blue-600 font-medium group-hover:text-blue-800">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Need Professional Printing Services?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Whether it's offset printing, digital printing, or any other
                service mentioned in this article, we're here to help bring your
                project to life with exceptional quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

        <Footer />
      </div>
  );
}
