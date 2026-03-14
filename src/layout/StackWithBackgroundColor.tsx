import { Stack } from "expo-router";
import { View } from "react-native";

export default function StackWithBackgroundColor() {
  return (
    <View className="bg-background-50 flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "tranparent",
          },
          title: "IELTS WriteCoach",
        }}
      />
    </View>
  );
}
