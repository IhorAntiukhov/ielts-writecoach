import { HStack } from "@/components/ui/hstack";
import { clsx } from "clsx";
import { Text, View } from "react-native";

interface LineLegendProps {
  category:
    | "Task Response"
    | "Coherence"
    | "Vocabulary"
    | "Grammar"
    | "Words per minute";
}

export default function LineLegend({ category }: LineLegendProps) {
  return (
    <HStack space="sm" className="items-center">
      <View
        className={clsx(
          "size-5 rounded-full",
          category === "Task Response"
            ? "bg-red-500"
            : category === "Coherence"
              ? "bg-blue-500"
              : category === "Vocabulary"
                ? "bg-green-500"
                : category === "Grammar"
                  ? "bg-purple-500"
                  : "bg-amber-500",
        )}
      ></View>

      <Text className="text-md text-typography-950">{category}</Text>
    </HStack>
  );
}
