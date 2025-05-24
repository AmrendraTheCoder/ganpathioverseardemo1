export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          comment_count: number | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string
          id: string
          like_count: number | null
          share_count: number | null
          slug: string
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author: string
          category: string
          comment_count?: number | null
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt: string
          id?: string
          like_count?: number | null
          share_count?: number | null
          slug: string
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author?: string
          category?: string
          comment_count?: number | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          like_count?: number | null
          share_count?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          blog_post_id: string | null
          comment_text: string
          created_at: string
          id: string
          parent_id: string | null
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          author_email: string
          author_name: string
          blog_post_id?: string | null
          comment_text: string
          created_at?: string
          id?: string
          parent_id?: string | null
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          author_email?: string
          author_name?: string
          blog_post_id?: string | null
          comment_text?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_likes: {
        Row: {
          blog_post_id: string | null
          created_at: string
          id: string
          reaction_type: string | null
          slug: string
          visitor_id: string
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          reaction_type?: string | null
          slug: string
          visitor_id: string
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          reaction_type?: string | null
          slug?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_likes_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_shares: {
        Row: {
          blog_post_id: string | null
          created_at: string
          id: string
          platform: string
          slug: string
          visitor_id: string | null
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          platform: string
          slug: string
          visitor_id?: string | null
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          platform?: string
          slug?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_shares_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_views: {
        Row: {
          blog_post_id: string | null
          created_at: string
          id: string
          referrer: string | null
          scroll_depth: number | null
          slug: string
          user_agent: string | null
          view_duration: number | null
          visitor_id: string | null
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          referrer?: string | null
          scroll_depth?: number | null
          slug: string
          user_agent?: string | null
          view_duration?: number | null
          visitor_id?: string | null
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          referrer?: string | null
          scroll_depth?: number | null
          slug?: string
          user_agent?: string | null
          view_duration?: number | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_views_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          response: string | null
          service_type: string | null
          status: string
          subject: string
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          response?: string | null
          service_type?: string | null
          status?: string
          subject: string
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          response?: string | null
          service_type?: string | null
          status?: string
          subject?: string
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      inquiry_history: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          original_created_at: string | null
          original_inquiry_id: string | null
          phone: string | null
          resolved_at: string
          resolved_by: string | null
          response: string | null
          service_type: string | null
          subject: string
          urgency: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          original_created_at?: string | null
          original_inquiry_id?: string | null
          phone?: string | null
          resolved_at?: string
          resolved_by?: string | null
          response?: string | null
          service_type?: string | null
          subject: string
          urgency?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          original_created_at?: string | null
          original_inquiry_id?: string | null
          phone?: string | null
          resolved_at?: string
          resolved_by?: string | null
          response?: string | null
          service_type?: string | null
          subject?: string
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_history_original_inquiry_id_fkey"
            columns: ["original_inquiry_id"]
            isOneToOne: false
            referencedRelation: "contact_inquiries"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          name: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          name?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          name?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const