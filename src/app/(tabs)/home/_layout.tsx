import EssayNavigationProvider from "@/src/screens/essay/shared/context/EssayNavigationProvider";
import { Stack } from "expo-router";

export default function IndexLayout() {
  return (
    <EssayNavigationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </EssayNavigationProvider>
  );
}
