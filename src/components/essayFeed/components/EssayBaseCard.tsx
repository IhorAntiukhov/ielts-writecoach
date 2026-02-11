import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
  PrivateFeedEssay,
  PublicFeedEssay,
} from "@/src/api/essaysRepo/types/feedEssayTypes";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop, useColorScheme } from "nativewind";
import { useState } from "react";
import { Text, TextLayoutEvent, View } from "react-native";
import EssayInstructions from "../../essayInstructions";
import EssayBandScore from "./EssayBandScore";

cssInterop(LinearGradient, {
  className: "style",
});

interface PrivateEssayCardProps {
  type: "private";
  data: PrivateFeedEssay;
}

interface PublicEssayCardProps {
  type: "public";
  data: PublicFeedEssay;
}

type EssayBaseCardProps = PrivateEssayCardProps | PublicEssayCardProps;

export default function EssayBaseCard({ type, data }: EssayBaseCardProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  const { colorScheme } = useColorScheme();

  const handleTextLayout = (event: TextLayoutEvent) => {
    const height = event.nativeEvent.lines.reduce(
      (sum, line) => sum + line.height,
      0,
    );

    setIsOverflowing(height > 200);
  };

  const gradientEndColor =
    colorScheme === "dark" ? "rgb(18, 18, 18)" : "rgb(255, 255, 255)";

  return (
    <VStack space="2xl">
      <EssayInstructions type={type} data={data} />

      <View className="relative">
        <Text
          className="max-h-[200px] text-typography-950 text-md"
          onTextLayout={handleTextLayout}
        >
          {data.response}
        </Text>

        {isOverflowing && (
          <LinearGradient
            colors={["transparent", gradientEndColor]}
            className="absolute bottom-0 left-0 w-full h-8"
          />
        )}
      </View>

      {data.review_id && (
        <HStack space="sm" className="w-full flex-wrap">
          <EssayBandScore
            category="Task Response"
            bandScore={data.task_response_band!}
          />

          <EssayBandScore
            category="Coherence"
            bandScore={data.coherence_band!}
          />

          <EssayBandScore
            category="Vocabulary"
            bandScore={data.vocabulary_band!}
          />

          <EssayBandScore category="Grammar" bandScore={data.grammar_band!} />
        </HStack>
      )}
    </VStack>
  );
}
