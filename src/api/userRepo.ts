import supabase from "./supabaseClient";

export async function getUserData(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function getUserStats(userId: string, isPublicProfile: boolean) {
  const { data, error } = await supabase
    .rpc("get_user_stats", {
      p_user_id: userId,
      is_public_profile: isPublicProfile,
    })
    .single();

  if (error) throw error;

  return data;
}
