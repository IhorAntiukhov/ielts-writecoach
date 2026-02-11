import EssayNavigationProvider from "@/src/screens/essay/shared/context/EssayNavigationProvider";
import { Stack } from "expo-router";

export default function PrivateLayout() {
  return (
    <EssayNavigationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </EssayNavigationProvider>
  );
}
