import EssayNavigationProvider from "@/src/screens/essay/shared/context/EssayNavigationProvider";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function PrivateLayout() {
  return (
    <EssayNavigationProvider>
      <View className="bg-background-50 flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "tranparent",
            },
          }}
        />
      </View>
    </EssayNavigationProvider>
  );
}
