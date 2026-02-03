import { clsx } from "clsx";
import { Text, View } from "react-native";

interface EssayBandScoreProps {
  category: "Task Response" | "Coherence" | "Vocabulary" | "Grammar";
  bandScore: number;
}

export default function EssayBandScore({
  category,
  bandScore,
}: EssayBandScoreProps) {
  return (
    <View
      className={clsx(
        "px-5 py-0.5 rounded-full",
        bandScore <= 4
          ? "bg-red-600"
          : bandScore > 4 && bandScore <= 5
            ? "bg-orange-600"
            : bandScore > 5 && bandScore <= 6.5
              ? "bg-yellow-600"
              : bandScore > 6.5 && bandScore <= 8
                ? "bg-blue-600"
                : "bg-green-600",
      )}
    >
      <Text className="text-typography-white">{`${category} ${bandScore.toString().padEnd(3, ".0")}`}</Text>
    </View>
  );
}
