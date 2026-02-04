export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      essays: {
        Row: {
          created_at: string;
          id: number;
          image_height: number | null;
          image_url: string | null;
          image_width: number | null;
          instructions: string;
          is_public: boolean;
          response: string;
          time: number | null;
          ts_vector: unknown;
          type: Database["public"]["Enums"]["EssayType"];
          user_id: string;
          word_count: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_height?: number | null;
          image_url?: string | null;
          image_width?: number | null;
          instructions: string;
          is_public?: boolean;
          response: string;
          time?: number | null;
          ts_vector?: unknown;
          type: Database["public"]["Enums"]["EssayType"];
          user_id: string;
          word_count: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_height?: number | null;
          image_url?: string | null;
          image_width?: number | null;
          instructions?: string;
          is_public?: boolean;
          response?: string;
          time?: number | null;
          ts_vector?: unknown;
          type?: Database["public"]["Enums"]["EssayType"];
          user_id?: string;
          word_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "essays_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: string;
          user_name: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: string;
          user_name?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          average_band_score: number | null;
          coherence_band: number;
          coherence_feedback: string;
          essay_id: number;
          grammar_band: number;
          grammar_feedback: string;
          id: number;
          task_response_band: number;
          task_response_feedback: string;
          user_id: string;
          vocabulary_band: number;
          vocabulary_feedback: string;
        };
        Insert: {
          average_band_score?: number | null;
          coherence_band: number;
          coherence_feedback: string;
          essay_id: number;
          grammar_band: number;
          grammar_feedback: string;
          id?: number;
          task_response_band: number;
          task_response_feedback: string;
          user_id: string;
          vocabulary_band: number;
          vocabulary_feedback: string;
        };
        Update: {
          average_band_score?: number | null;
          coherence_band?: number;
          coherence_feedback?: string;
          essay_id?: number;
          grammar_band?: number;
          grammar_feedback?: string;
          id?: number;
          task_response_band?: number;
          task_response_feedback?: string;
          user_id?: string;
          vocabulary_band?: number;
          vocabulary_feedback?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_essay_id_fkey";
            columns: ["essay_id"];
            isOneToOne: false;
            referencedRelation: "essays";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      save_essay_analysis: {
        Args: {
          coherence_band: number;
          coherence_feedback: string;
          essay_id: number;
          grammar_band: number;
          grammar_feedback: string;
          task_response_band: number;
          task_response_feedback: string;
          user_id: string;
          vocabulary_band: number;
          vocabulary_feedback: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      EssayType: "task-1G" | "task-1A" | "task-2";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      EssayType: ["task-1G", "task-1A", "task-2"],
    },
  },
} as const;
