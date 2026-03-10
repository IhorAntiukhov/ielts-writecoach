import { Tables } from "../types/supabase";
import supabase from "./supabaseClient";

export async function getGlobalReports(userId: string) {
  const { data, error } = await supabase
    .from("global_reports")
    .select()
    .eq("user_id", userId)
    .order("start_date", { ascending: false })
    .order("end_date", { ascending: false });

  if (error) throw error;

  return data;
}

export type GlobalReport = Tables<"global_reports">;

export async function saveGlobalReport(
  startDate: Date,
  endDate: Date,
  report: string,
  userId: string,
) {
  const { error } = await supabase.rpc("save_global_report", {
    p_start_date: startDate.toISOString(),
    p_end_date: endDate.toISOString(),
    p_report: report,
    p_user_id: userId,
  });

  if (error) throw error;
}
