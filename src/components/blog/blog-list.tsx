"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, User, Search, Grid, List, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Extract unique categories
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Filter posts based on search term and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log("Subscribing email:", email);
    setSubscribed(true);
    setTimeout(() => {
      setShowSubscribeModal(false);
      setSubscribed(false);
      setEmail("");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Section with Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles, authors, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Subscribe Button */}
            <Button 
              onClick={() => setShowSubscribeModal(true)}
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All Articles ({posts.length})
          </Button>
          {categories.map((category) => {
            const count = posts.filter(post => post.category === category).length;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          {selectedCategory && (
            <>
              {' '}in <Badge variant="secondary">{selectedCategory}</Badge>
            </>
          )}
        </p>
      </div>

      {/* Posts Display */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="max-w-md mx-auto">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
        }>
          {filteredPosts.map((post) => (
            viewMode === 'grid' ? (
              // Grid View
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.cover_image || "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.created_at)}</span>
                      <span className="mx-2">•</span>
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-blue-900 font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ) : (
              // List View
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex gap-6">
                    <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={post.cover_image || "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(post.created_at)}</span>
                          <span className="mx-2">•</span>
                          <User className="w-4 h-4 mr-1" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-900 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-blue-900 font-medium">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )
          ))}
        </div>
      )}

      {/* Newsletter Subscription Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
              <p className="text-gray-600">
                Subscribe to our newsletter and never miss our latest printing tips and industry insights.
              </p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSubscribeModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-900 hover:bg-blue-800">
                    Subscribe
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-green-600 mb-2">Successfully Subscribed!</h4>
                <p className="text-gray-600">Thank you for subscribing to our newsletter.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}