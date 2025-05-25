import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../../supabase/server";
import { notFound } from "next/navigation";
import BlogPostClient from "./blog-post-client";
import type { Metadata } from "next";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  created_at: string;
  updated_at: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema_markup?: any;
  focus_keyword?: string;
  seo_score?: number;
  reading_time?: number;
  word_count?: number;
  featured?: boolean;
  status?: string;
  publish_date?: string;
  last_modified?: string;
  tags?: string[];
  related_posts?: string[];
  alt_text?: string;
  image_caption?: string;
  breadcrumb_path?: string[];
  view_count?: number;
  like_count?: number;
  comment_count?: number;
}

// Generate comprehensive metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!post) {
    return {
      title: "Post Not Found - Ganpathi Overseas",
      description: "The requested blog post could not be found",
      robots: "noindex,nofollow",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ganpathioverseas.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage =
    post.og_image || post.cover_image || `${baseUrl}/default-og-image.jpg`;

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    image: {
      "@type": "ImageObject",
      url: ogImage,
      alt: post.alt_text || post.title,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.author,
      url: `${baseUrl}/author/${post.author.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Ganpathi Overseas",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 300,
        height: 100,
      },
    },
    datePublished: post.publish_date || post.created_at,
    dateModified: post.last_modified || post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    keywords: post.meta_keywords || (post.tags ? post.tags.join(", ") : ""),
    wordCount: post.word_count,
    timeRequired: `PT${post.reading_time || 5}M`,
    articleSection: post.category,
    inLanguage: "en-US",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.category,
          item: `${baseUrl}/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: post.title,
          item: postUrl,
        },
      ],
    },
    ...(post.schema_markup || {}),
  };

  return {
    title: post.meta_title || `${post.title} - Ganpathi Overseas Blog`,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords || (post.tags ? post.tags.join(", ") : ""),

    // OpenGraph tags
    openGraph: {
      title: post.og_title || post.meta_title || post.title,
      description: post.og_description || post.meta_description || post.excerpt,
      url: postUrl,
      siteName: "Ganpathi Overseas",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.alt_text || post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publish_date || post.created_at,
      modifiedTime: post.last_modified || post.updated_at,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },

    // Twitter Card tags
    twitter: {
      card: (post.twitter_card as any) || "summary_large_image",
      title: post.twitter_title || post.og_title || post.title,
      description:
        post.twitter_description || post.og_description || post.excerpt,
      images: [post.twitter_image || ogImage],
      creator: "@ganpathioverseas",
      site: "@ganpathioverseas",
    },

    // Additional SEO tags
    alternates: {
      canonical: post.canonical_url || postUrl,
    },

    // Robots
    robots: {
      index: post.status === "published",
      follow: true,
      googleBot: {
        index: post.status === "published",
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Additional meta tags
    other: {
      // Article specific
      "article:published_time": post.publish_date || post.created_at,
      "article:modified_time": post.last_modified || post.updated_at,
      "article:author": post.author,
      "article:section": post.category,
      "article:tag": post.tags?.join(","),

      // SEO specific
      "content-language": "en-US",
      "reading-time": `${post.reading_time || 5} minutes`,
      "word-count": post.word_count?.toString(),
      "seo-score": post.seo_score?.toString(),

      // Schema.org JSON-LD
      "script:ld+json": JSON.stringify(structuredData),
    },
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  // Fetch blog post with all SEO data
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      view_count,
      like_count,
      comment_count,
      share_count
    `
    )
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  // Fetch related posts based on category and tags
  let relatedPostsQuery = supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, cover_image, author, category, created_at, reading_time"
    )
    .eq("status", "published")
    .neq("id", post.id)
    .limit(3);

  if (post.tags && post.tags.length > 0) {
    relatedPostsQuery = relatedPostsQuery.overlaps("tags", post.tags);
  } else {
    relatedPostsQuery = relatedPostsQuery.eq("category", post.category);
  }

  const { data: relatedPosts } = await relatedPostsQuery;

  // Track page view (server-side)
  try {
    await supabase.rpc("increment_view_count", { post_id: post.id });

    // Log detailed analytics
    await supabase.from("blog_views").insert([
      {
        blog_post_id: post.id,
        slug: post.slug,
        user_agent: "server-side-render",
        referrer: "direct",
        ip_address: "server",
        session_id: "ssr-session",
      },
    ]);
  } catch (error) {
    console.error("Error tracking view:", error);
  }

  // Generate breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    {
      name: post.category,
      url: `/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`,
    },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.meta_title || post.title,
            description: post.meta_description || post.excerpt,
            image: {
              "@type": "ImageObject",
              url: post.og_image || post.cover_image,
              alt: post.alt_text || post.title,
            },
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Ganpathi Overseas",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: post.publish_date || post.created_at,
            dateModified: post.last_modified || post.updated_at,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
            },
            ...(post.schema_markup || {}),
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`,
              })),
            }),
          }}
        />

        {/* Pass enhanced data to client component */}
        

        <Footer />
      </div>
    </>
  );
}
