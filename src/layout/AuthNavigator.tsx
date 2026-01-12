import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { use, useEffect } from "react";
import { View } from "react-native";
import { AuthContext } from "../context/AuthProvider";

export default function AuthNavigator() {
  const { session, authIntent, setAuthIntent } = use(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (session === null && segments[0] !== "(auth)") {
      router.replace("/(auth)/login");
    }

    if (session !== null && segments[0] === "(auth)") {
      router.replace(
        authIntent === "normal" ? "/(tabs)" : "/(tabs)/profile/change-password",
      );
      if (authIntent === "password-reset") setAuthIntent?.("normal");
    }
  }, [router, segments, session, authIntent, setAuthIntent]);

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)/login" />
        </Stack.Protected>

        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
