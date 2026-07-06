export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      downloads: {
        Row: {
          created_at: string
          created_by: string | null
          file_path: string | null
          file_url: string | null
          id: string
          is_active: boolean
          name: string
          section: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          is_active?: boolean
          name: string
          section: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          is_active?: boolean
          name?: string
          section?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      executive_bios: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          linkedin_url: string | null
          name: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          linkedin_url?: string | null
          name: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          linkedin_url?: string | null
          name?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: string | null
          headline: string
          id: string
          image_url: string
          is_active: boolean
          sort_order: number
          subtitle: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          headline: string
          id?: string
          image_url: string
          is_active?: boolean
          sort_order?: number
          subtitle?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          headline?: string
          id?: string
          image_url?: string
          is_active?: boolean
          sort_order?: number
          subtitle?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          address: string
          applicant_references: Json | null
          applicant_signature: string | null
          available_start_date: string | null
          city: string
          desired_pay: string | null
          education: string | null
          email: string
          employment_history: Json | null
          felony_explanation: string | null
          felony_history: boolean | null
          first_name: string
          how_heard: string | null
          id: string
          job_listing_id: string | null
          last_name: string
          legally_authorized: boolean | null
          middle_name: string | null
          phone: string
          position_applied: string
          resume_url: string | null
          signature_date: string | null
          skills: string | null
          state: string
          submitted_at: string
          zip: string
        }
        Insert: {
          address: string
          applicant_references?: Json | null
          applicant_signature?: string | null
          available_start_date?: string | null
          city: string
          desired_pay?: string | null
          education?: string | null
          email: string
          employment_history?: Json | null
          felony_explanation?: string | null
          felony_history?: boolean | null
          first_name: string
          how_heard?: string | null
          id?: string
          job_listing_id?: string | null
          last_name: string
          legally_authorized?: boolean | null
          middle_name?: string | null
          phone: string
          position_applied: string
          resume_url?: string | null
          signature_date?: string | null
          skills?: string | null
          state: string
          submitted_at?: string
          zip: string
        }
        Update: {
          address?: string
          applicant_references?: Json | null
          applicant_signature?: string | null
          available_start_date?: string | null
          city?: string
          desired_pay?: string | null
          education?: string | null
          email?: string
          employment_history?: Json | null
          felony_explanation?: string | null
          felony_history?: boolean | null
          first_name?: string
          how_heard?: string | null
          id?: string
          job_listing_id?: string | null
          last_name?: string
          legally_authorized?: boolean | null
          middle_name?: string | null
          phone?: string
          position_applied?: string
          resume_url?: string | null
          signature_date?: string | null
          skills?: string | null
          state?: string
          submitted_at?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_listing_id_fkey"
            columns: ["job_listing_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_listings: {
        Row: {
          created_at: string
          created_by: string | null
          department: string | null
          description: string
          employment_type: string
          id: string
          is_active: boolean
          location: string
          requirements: string | null
          shift: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          description: string
          employment_type?: string
          id?: string
          is_active?: boolean
          location?: string
          requirements?: string | null
          shift?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string
          employment_type?: string
          id?: string
          is_active?: boolean
          location?: string
          requirements?: string | null
          shift?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          notify_job_applications: boolean
          notify_quote_requests: boolean
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          notify_job_applications?: boolean
          notify_quote_requests?: boolean
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          notify_job_applications?: boolean
          notify_quote_requests?: boolean
          user_id?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          annual_volume: string | null
          company: string | null
          diameters: string | null
          email: string
          first_name: string
          id: string
          industry: string | null
          last_name: string
          message: string
          phone: string | null
          submitted_at: string
        }
        Insert: {
          annual_volume?: string | null
          company?: string | null
          diameters?: string | null
          email: string
          first_name: string
          id?: string
          industry?: string | null
          last_name: string
          message: string
          phone?: string | null
          submitted_at?: string
        }
        Update: {
          annual_volume?: string | null
          company?: string | null
          diameters?: string | null
          email?: string
          first_name?: string
          id?: string
          industry?: string | null
          last_name?: string
          message?: string
          phone?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      site_images: {
        Row: {
          alt_text: string | null
          created_at: string
          file_path: string | null
          id: string
          key: string
          updated_at: string
          url: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_path?: string | null
          id?: string
          key: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_path?: string | null
          id?: string
          key?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      site_videos: {
        Row: {
          created_at: string
          file_path: string | null
          id: string
          key: string
          name: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          id?: string
          key: string
          name: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          file_path?: string | null
          id?: string
          key?: string
          name?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weather_alerts: {
        Row: {
          created_at: string
          created_by: string | null
          duration_hours: number | null
          expires_at: string | null
          id: string
          is_active: boolean
          message: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          duration_hours?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          duration_hours?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_webhook_secret: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin"],
    },
  },
} as const
