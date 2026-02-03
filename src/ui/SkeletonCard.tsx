import { SkeletonText } from "@/components/ui/skeleton";
import { View } from "react-native";

export default function SkeletonCard() {
  return (
    <View className="w-full max-w-[600px] px-8 py-6 bg-background-100 rounded-lg">
      <SkeletonText _lines={3} className="h-2" />
    </View>
  );
}
