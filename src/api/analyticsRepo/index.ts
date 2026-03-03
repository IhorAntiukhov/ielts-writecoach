import EssayAndAllType from "@/src/screens/analytics/types/essayAndAllType";
import TimeIntervalType from "../../screens/analytics/types/timeInterval";
import supabase from "../supabaseClient";
import {
  GetUserEssayAnalyticsReturnType,
  GetUserEssayCountsReturnType,
  GetUserReactionCountsReturnType,
} from "./types/returnDataTypes";

export async function getUserEssayCounts(
  userId: string,
  timeInterval: TimeIntervalType,
): Promise<GetUserEssayCountsReturnType> {
  const { data, error } = await supabase.rpc("get_user_essay_counts", {
    p_user_id: userId,
    time_interval: Number(timeInterval),
  });

  if (error) throw error;

  return { type: "essayCounts", items: data };
}

export async function getUserEssayAnalytics(
  userId: string,
  timeInterval: TimeIntervalType,
  essayType: EssayAndAllType,
): Promise<GetUserEssayAnalyticsReturnType> {
  const { data, error } = await supabase.rpc("get_user_analytics", {
    p_user_id: userId,
    time_interval: Number(timeInterval),
    essay_type: essayType === "all" ? undefined : essayType,
  });

  if (error) throw error;

  return { type: "userAnalytics", items: data };
}

export async function getUserReactionCounts(
  userId: string,
  timeInterval: TimeIntervalType,
  essayType: EssayAndAllType,
): Promise<GetUserReactionCountsReturnType> {
  const { data, error } = await supabase.rpc("get_user_reaction_counts", {
    p_user_id: userId,
    time_interval: Number(timeInterval),
    essay_type: essayType === "all" ? undefined : essayType,
  });

  if (error) throw error;

  return { type: "reactionCounts", items: data };
}
