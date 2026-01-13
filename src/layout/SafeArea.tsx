import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SafeArea({ children }: React.PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-secondary-300">
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
