import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <StatusBar style="auto" />
      <Stack></Stack>
    </GluestackUIProvider>
  );
}
