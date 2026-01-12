import supabase from "@/src/api/supabase";

export default async function changePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) throw error;
}
