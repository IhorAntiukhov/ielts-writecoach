import supabase from "@/src/api/supabase";

export async function getUserData(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_name, avatar_url")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
