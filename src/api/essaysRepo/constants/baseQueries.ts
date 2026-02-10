import supabase from "../../supabaseClient";
import PAGE_SIZE from "./pageSize";

export function createPublicFeedBaseQuery() {
  return supabase
    .from("public_essay_feed")
    .select("*")
    .limit(PAGE_SIZE + 1);
}

export function createPrivateFeedBaseQuery(userId: string) {
  return supabase.from("private_essay_feed").select("*").eq("user_id", userId);
}
