import { useEffect, useState, useCallback } from 'react';
import { createClient } from '../supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  created_at: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  cover_image: string;
}

interface BlogAnalytics {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalPosts: number;
  engagementRate: number;
  viewsThisWeek: number;
  recentActivity: any[];
}

// Type definitions for the joined query results
interface BlogViewWithPost {
  created_at: string;
  blog_posts: {
    title: string;
    slug: string;
  } | null;
}

interface BlogLikeWithPost {
  created_at: string;
  blog_posts: {
    title: string;
    slug: string;
  } | null;
}

interface BlogCommentWithPost {
  created_at: string;
  author_name: string;
  blog_posts: {
    title: string;
    slug: string;
  } | null;
}

interface BlogShareWithPost {
  created_at: string;
  platform: string;
  blog_posts: {
    title: string;
    slug: string;
  } | null;
}

export const useRealtimeBlogAnalytics = (initialPosts?: BlogPost[]) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [analytics, setAnalytics] = useState<BlogAnalytics>({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    totalPosts: 0,
    engagementRate: 0,
    viewsThisWeek: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  // Calculate analytics from posts
  const calculateAnalytics = useCallback((postsData: BlogPost[]) => {
    const totalViews = postsData.reduce((sum, post) => sum + (post.view_count || 0), 0);
    const totalLikes = postsData.reduce((sum, post) => sum + (post.like_count || 0), 0);
    const totalComments = postsData.reduce((sum, post) => sum + (post.comment_count || 0), 0);
    const totalShares = postsData.reduce((sum, post) => sum + (post.share_count || 0), 0);
    const totalPosts = postsData.length;
    
    const engagementActions = totalLikes + totalComments + totalShares;
    const engagementRate = totalViews > 0 ? Math.round((engagementActions / totalViews) * 100) : 0;

    return {
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      totalPosts,
      engagementRate,
      viewsThisWeek: 0, // Will be calculated separately
      recentActivity: [],
    };
  }, []);

  // Fetch posts with latest analytics
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          view_count,
          like_count,
          comment_count,
          share_count,
          created_at,
          category,
          author,
          excerpt,
          content,
          cover_image
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setPosts(data);
        setAnalytics(calculateAnalytics(data));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, calculateAnalytics]);

  // Fetch recent activity
  const fetchRecentActivity = useCallback(async () => {
    try {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      const [viewsData, likesData, commentsData, sharesData] = await Promise.all([
        supabase
          .from('blog_views')
          .select(`
            created_at,
            blog_posts!inner(title, slug)
          `)
          .gte('created_at', oneHourAgo.toISOString())
          .order('created_at', { ascending: false })
          .limit(5)
          .returns<BlogViewWithPost[]>(),
        supabase
          .from('blog_likes')
          .select(`
            created_at,
            blog_posts!inner(title, slug)
          `)
          .gte('created_at', oneHourAgo.toISOString())
          .order('created_at', { ascending: false })
          .limit(5)
          .returns<BlogLikeWithPost[]>(),
        supabase
          .from('blog_comments')
          .select(`
            created_at,
            author_name,
            blog_posts!inner(title, slug)
          `)
          .eq('status', 'approved')
          .gte('created_at', oneHourAgo.toISOString())
          .order('created_at', { ascending: false })
          .limit(5)
          .returns<BlogCommentWithPost[]>(),
        supabase
          .from('blog_shares')
          .select(`
            created_at,
            platform,
            blog_posts!inner(title, slug)
          `)
          .gte('created_at', oneHourAgo.toISOString())
          .order('created_at', { ascending: false })
          .limit(5)
          .returns<BlogShareWithPost[]>()
      ]);

      // Combine recent activity
      const recentActivity = [
        ...(viewsData.data || []).map(item => ({
          type: 'view',
          title: item.blog_posts?.title || 'Unknown Post',
          slug: item.blog_posts?.slug || '',
          time: item.created_at,
          description: 'New page view'
        })),
        ...(likesData.data || []).map(item => ({
          type: 'like',
          title: item.blog_posts?.title || 'Unknown Post',
          slug: item.blog_posts?.slug || '',
          time: item.created_at,
          description: 'Article liked'
        })),
        ...(commentsData.data || []).map(item => ({
          type: 'comment',
          title: item.blog_posts?.title || 'Unknown Post',
          slug: item.blog_posts?.slug || '',
          time: item.created_at,
          description: `Comment by ${item.author_name}`
        })),
        ...(sharesData.data || []).map(item => ({
          type: 'share',
          title: item.blog_posts?.title || 'Unknown Post',
          slug: item.blog_posts?.slug || '',
          time: item.created_at,
          description: `Shared on ${item.platform}`
        }))
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

      setAnalytics(prev => ({ ...prev, recentActivity }));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  }, [supabase]);

  // Set up real-time subscriptions
  useEffect(() => {
    // Subscribe to blog_posts changes (when stats are updated)
    const postsChannel = supabase
      .channel('blog_posts_realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog_posts',
        },
        (payload) => {
          console.log('Blog post updated:', payload);
          // Update the specific post in state
          setPosts(prevPosts => 
            prevPosts.map(post => 
              post.id === payload.new.id 
                ? { ...post, ...payload.new }
                : post
            )
          );
          // Recalculate analytics
          setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(post => 
              post.id === payload.new.id 
                ? { ...post, ...payload.new }
                : post
            );
            setAnalytics(calculateAnalytics(updatedPosts));
            return updatedPosts;
          });
        }
      )
      .subscribe();

    // Subscribe to new views
    const viewsChannel = supabase
      .channel('blog_views_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog_views',
        },
        (payload) => {
          console.log('New view:', payload);
          fetchRecentActivity();
        }
      )
      .subscribe();

    // Subscribe to new likes
    const likesChannel = supabase
      .channel('blog_likes_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_likes',
        },
        (payload) => {
          console.log('Like event:', payload);
          fetchRecentActivity();
        }
      )
      .subscribe();

    // Subscribe to new comments
    const commentsChannel = supabase
      .channel('blog_comments_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_comments',
        },
        (payload) => {
          console.log('Comment event:', payload);
          fetchRecentActivity();
        }
      )
      .subscribe();

    // Subscribe to new shares
    const sharesChannel = supabase
      .channel('blog_shares_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog_shares',
        },
        (payload) => {
          console.log('New share:', payload);
          fetchRecentActivity();
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(viewsChannel);
      supabase.removeChannel(likesChannel);
      supabase.removeChannel(commentsChannel);
      supabase.removeChannel(sharesChannel);
    };
  }, [supabase, fetchRecentActivity, calculateAnalytics]);

  // Initial data fetch
  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      fetchPosts();
    } else {
      setAnalytics(calculateAnalytics(initialPosts));
    }
    fetchRecentActivity();
  }, [fetchPosts, fetchRecentActivity, initialPosts, calculateAnalytics]);

  // Refresh data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
      fetchRecentActivity();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchPosts, fetchRecentActivity]);

  return {
    posts,
    analytics,
    isLoading,
    refreshData: fetchPosts,
  };
};