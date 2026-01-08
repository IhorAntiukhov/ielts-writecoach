import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthProvider from "../context/AuthProvider";
import AuthNavigator from "../layout/AuthNavigator";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-secondary-300">
              <AuthProvider>
                <AuthNavigator />
              </AuthProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GluestackUIProvider>
  );
}
