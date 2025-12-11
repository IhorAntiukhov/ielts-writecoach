import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthProvider from "../context/AuthProvider";
import AuthNavigator from "../navigation/AuthNavigator";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <SafeAreaProvider>
        <SafeAreaView
          className="flex-1 bg-secondary"
          edges={["top", "left", "right"]}
        >
          <AuthProvider>
            <AuthNavigator />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
