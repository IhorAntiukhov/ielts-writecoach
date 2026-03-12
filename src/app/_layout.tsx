import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import AlertDialogProvider from "../context/AlertDialogProvider";
import AuthProvider from "../context/AuthProvider";
import AuthNavigator from "../layout/AuthNavigator";
import SafeArea from "../layout/SafeArea";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="dark">
        <AlertDialogProvider>
          <KeyboardProvider>
            <SafeArea>
              <AuthProvider>
                <AuthNavigator />
              </AuthProvider>
            </SafeArea>
          </KeyboardProvider>
        </AlertDialogProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
