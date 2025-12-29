import supabase from "@/src/api/supabase";
import * as Linking from "expo-linking";

const redirectToAfterSignUp = Linking.createURL("(auth)/profile");

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}

export async function signUp(
  userName: string,
  email: string,
  password: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: userName,
      },
      emailRedirectTo: redirectToAfterSignUp,
    },
  });

  if (error) throw error;

  return data;
}
