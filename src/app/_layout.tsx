import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import AuthProvider from "../context/AuthProvider";
import AuthNavigator from "../layout/AuthNavigator";
import SafeArea from "../layout/SafeArea";

const queryClient = new QueryClient();

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    // <GluestackUIProvider mode={scheme || "light"}>
    <GluestackUIProvider mode="dark">
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <SafeArea>
            <AuthProvider>
              <AuthNavigator />
            </AuthProvider>
          </SafeArea>
        </QueryClientProvider>
      </KeyboardProvider>
    </GluestackUIProvider>
  );
}
