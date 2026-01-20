import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { use, useEffect } from "react";
import { View } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import useResetPassword from "../hooks/useResetPassword";

export default function AuthNavigator() {
  const { session, authIntent, setAuthIntent } = use(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useResetPassword();

  useEffect(() => {
    if (session === null && segments[0] !== "(auth)") {
      router.replace("/(auth)");
    }

    if (session !== null && segments[0] === "(auth)") {
      router.replace("/(tabs)");
    }
  }, [router, segments, session, authIntent, setAuthIntent]);

  useEffect(() => {
    if (!session || authIntent !== "password-reset" || segments[0] !== "(tabs)")
      return;

    router.push("/(tabs)/profile/change-password");

    requestAnimationFrame(() => {
      setAuthIntent?.("normal");
    });
  }, [router, session, segments, authIntent, setAuthIntent]);

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
