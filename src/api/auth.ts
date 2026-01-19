import supabase from "@/src/api/supabaseClient";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const redirectToLogin = Linking.createURL("/(auth)/login");
const redirectToForgotPassword = Linking.createURL("/(auth)/forgot-password");

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
      redirectTo: redirectToLogin,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(data.url, redirectToLogin);

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
        avatar_timestamp: Date.now(),
      },
      emailRedirectTo: redirectToLogin,
    },
  });

  if (error) throw error;

  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectToForgotPassword,
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

interface ChangeUserPropertiesType {
  userName?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

export async function changeUserProperties({
  userName,
  email,
  password,
  avatarUrl,
}: ChangeUserPropertiesType) {
  const { error } = await supabase.auth.updateUser({
    email,
    password,
    data: {
      name: userName,
      avatar_url: avatarUrl,
      avatar_timestamp: avatarUrl ? Date.now() : undefined,
    },
  });

  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
