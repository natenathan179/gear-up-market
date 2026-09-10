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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      products: {
        Row: {
          available: boolean
          brand: string
          brand_slug: string
          category: string
          city: string
          condition: Database["public"]["Enums"]["product_condition"]
          created_at: string
          description: string
          featured: boolean
          id: string
          images: string[]
          model: string
          muscle_group: string
          price: number
          resistance: string
          seller: Json
          shipping: string
          slug: string
          specs: Json
          state: string
          state_slug: string
          subcategory: string
          title: string
          updated_at: string
          usage: Database["public"]["Enums"]["product_usage"]
          warranty: string
        }
        Insert: {
          available?: boolean
          brand?: string
          brand_slug?: string
          category: string
          city?: string
          condition?: Database["public"]["Enums"]["product_condition"]
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          images?: string[]
          model?: string
          muscle_group?: string
          price?: number
          resistance?: string
          seller?: Json
          shipping?: string
          slug: string
          specs?: Json
          state?: string
          state_slug?: string
          subcategory?: string
          title: string
          updated_at?: string
          usage?: Database["public"]["Enums"]["product_usage"]
          warranty?: string
        }
        Update: {
          available?: boolean
          brand?: string
          brand_slug?: string
          category?: string
          city?: string
          condition?: Database["public"]["Enums"]["product_condition"]
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          images?: string[]
          model?: string
          muscle_group?: string
          price?: number
          resistance?: string
          seller?: Json
          shipping?: string
          slug?: string
          specs?: Json
          state?: string
          state_slug?: string
          subcategory?: string
          title?: string
          updated_at?: string
          usage?: Database["public"]["Enums"]["product_usage"]
          warranty?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          avatar_url: string
          created_at: string
          id: string
          location: string
          name: string
          product_title: string | null
          published: boolean
          quote: string
          rating: number
        }
        Insert: {
          avatar_url?: string
          created_at?: string
          id?: string
          location?: string
          name: string
          product_title?: string | null
          published?: boolean
          quote: string
          rating?: number
        }
        Update: {
          avatar_url?: string
          created_at?: string
          id?: string
          location?: string
          name?: string
          product_title?: string | null
          published?: boolean
          quote?: string
          rating?: number
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
      product_condition:
        | "New"
        | "Excellent"
        | "Very Good"
        | "Good"
        | "Refurbished"
      product_usage: "Commercial" | "Home"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      product_condition: [
        "New",
        "Excellent",
        "Very Good",
        "Good",
        "Refurbished",
      ],
      product_usage: ["Commercial", "Home"],
    },
  },
} as const
