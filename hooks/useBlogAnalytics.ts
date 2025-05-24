import { useEffect, useState, useCallback } from 'react';
import { createClient } from '../supabase/client';

// Generate or get visitor ID
const getVisitorId = (): string => {
  if (typeof window === 'undefined') return 'server';
  
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const useBlogAnalytics = (blogPostId: string, slug: string) => {
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [startTime] = useState(Date.now());
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  
  const supabase = createClient();
  const visitorId = getVisitorId();

  // Track page view
  const trackView = useCallback(async () => {
    if (hasTrackedView) return;
    
    try {
      const { error } = await supabase
        .from('blog_views')
        .insert([{
          blog_post_id: blogPostId,
          slug,
          visitor_id: visitorId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        }]);

      if (!error) {
        setHasTrackedView(true);
      }
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  }, [blogPostId, slug, visitorId, hasTrackedView, supabase]);

  // Update view with engagement data
  const updateViewEngagement = useCallback(async () => {
    if (!hasTrackedView) return;

    const viewDuration = Math.floor((Date.now() - startTime) / 1000);
    
    try {
      await supabase
        .from('blog_views')
        .update({
          view_duration: viewDuration,
          scroll_depth: scrollDepth,
        })
        .eq('blog_post_id', blogPostId)
        .eq('visitor_id', visitorId)
        .order('created_at', { ascending: false })
        .limit(1);
    } catch (error) {
      console.error('Error updating view engagement:', error);
    }
  }, [blogPostId, visitorId, hasTrackedView, scrollDepth, startTime, supabase]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollDepth = Math.floor((scrollTop / documentHeight) * 100);
      
      if (currentScrollDepth > scrollDepth) {
        setScrollDepth(Math.min(currentScrollDepth, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDepth]);

  // Track view on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      trackView();
    }, 1000); // Wait 1 second before tracking view

    return () => clearTimeout(timer);
  }, [trackView]);

  // Update engagement data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updateViewEngagement();
    }, 30000); // Update every 30 seconds

    // Update on page unload
    const handleBeforeUnload = () => {
      updateViewEngagement();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      updateViewEngagement(); // Final update on cleanup
    };
  }, [updateViewEngagement]);

  // Check if user already liked this post
  useEffect(() => {
    const checkExistingLike = async () => {
      try {
        const { data } = await supabase
          .from('blog_likes')
          .select('id')
          .eq('blog_post_id', blogPostId)
          .eq('visitor_id', visitorId)
          .single();

        setIsLiked(!!data);
      } catch (error) {
        // User hasn't liked yet
        setIsLiked(false);
      }
    };

    checkExistingLike();
  }, [blogPostId, visitorId, supabase]);

  // Get current stats
  useEffect(() => {
    const getStats = async () => {
      try {
        const { data: post } = await supabase
          .from('blog_posts')
          .select('like_count, view_count')
          .eq('id', blogPostId)
          .single();

        if (post) {
          setLikeCount(post.like_count || 0);
          setViewCount(post.view_count || 0);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    getStats();
  }, [blogPostId, supabase]);

  // Toggle like
  const toggleLike = useCallback(async () => {
    try {
      if (isLiked) {
        // Remove like
        await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_post_id', blogPostId)
          .eq('visitor_id', visitorId);
        
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        // Add like
        await supabase
          .from('blog_likes')
          .insert([{
            blog_post_id: blogPostId,
            slug,
            visitor_id: visitorId,
            reaction_type: 'like',
          }]);
        
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [blogPostId, slug, visitorId, isLiked, supabase]);

  // Track share
  const trackShare = useCallback(async (platform: string) => {
    try {
      await supabase
        .from('blog_shares')
        .insert([{
          blog_post_id: blogPostId,
          slug,
          platform,
          visitor_id: visitorId,
        }]);
    } catch (error) {
      console.error('Error tracking share:', error);
    }
  }, [blogPostId, slug, visitorId, supabase]);

  return {
    scrollDepth,
    isLiked,
    likeCount,
    viewCount,
    toggleLike,
    trackShare,
  };
};