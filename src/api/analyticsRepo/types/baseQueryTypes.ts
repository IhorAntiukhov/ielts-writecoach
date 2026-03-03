import { Database } from "@/src/types/supabase";

export type GetUserEssayCountsDataType =
  Database["public"]["Functions"]["get_user_essay_counts"]["Returns"];

export type GetUserEssayAnalyticsDataType =
  Database["public"]["Functions"]["get_user_analytics"]["Returns"];

export type GetUserReactionCountsDataType =
  Database["public"]["Functions"]["get_user_reaction_counts"]["Returns"];
