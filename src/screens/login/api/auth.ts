import supabase from "@/src/api/supabase";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = Linking.createURL("/(auth)/login");

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (res.type === "success" && res.url) {
    const url = new URL(res.url);
    const fragment = url.hash.substring(1);
    const params = new URLSearchParams(fragment);

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    await setSession(accessToken, refreshToken);
  } else {
    throw new Error("Google auth session failed");
  }
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
        name: userName,
      },
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error;

  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) throw error;
}

export async function setSession(
  accessToken: string | null,
  refreshToken: string | null,
) {
  if (accessToken && refreshToken) {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) throw new Error("Failed to set session");
  }
}
