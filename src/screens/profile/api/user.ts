import supabase from "@/src/api/supabase";

interface ChangeUserPropertiesType {
  userName?: string;
  email?: string;
}

export async function changeUserProperties({
  userName,
  email,
}: ChangeUserPropertiesType) {
  const { error } = await supabase.auth.updateUser({
    email,
    data: { name: userName },
  });

  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
