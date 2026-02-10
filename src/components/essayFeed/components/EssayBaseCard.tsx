import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
  PrivateEssay,
  PublicEssay,
} from "@/src/api/essaysRepo/types/essayTypes";
import useOpenEssay from "@/src/hooks/useOpenEssay";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop, useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, Text, TextLayoutEvent, View } from "react-native";
import EssayBandScore from "./EssayBandScore";

cssInterop(LinearGradient, {
  className: "style",
});

interface PrivateEssayCardProps {
  type: "private";
  data: PrivateEssay;
}

interface PublicEssayCardProps {
  type: "public";
  data: PublicEssay;
}

type EssayBaseCardProps = PrivateEssayCardProps | PublicEssayCardProps;

export default function EssayBaseCard({ type, data }: EssayBaseCardProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  const { colorScheme } = useColorScheme();

  const essayType =
    data.type === "task-1A"
      ? "Academic Task 1"
      : data.type === "task-1G"
        ? "General Task 1"
        : "Task 2";

  const handleTextLayout = (event: TextLayoutEvent) => {
    const height = event.nativeEvent.lines.reduce(
      (sum, line) => sum + line.height,
      0,
    );

    setIsOverflowing(height > 200);
  };

  const { openEssay } = useOpenEssay(
    type === "private",
    data.id!,
    data.user_id!,
  );

  const gradientEndColor =
    colorScheme === "dark" ? "rgb(18, 18, 18)" : "rgb(255, 255, 255)";

  return (
    <VStack space="2xl">
      <Pressable onPress={openEssay}>
        <Text className="text-typography-950 text-lg">
          <Text className="font-bold">{`${essayType}: `}</Text>
          {data.instructions}
        </Text>
      </Pressable>

      {data.image_url && (
        <Image
          source={{ uri: data.image_url }}
          className="w-full rounded-lg border border-y border-outline-300"
          style={{
            aspectRatio:
              data.image_width && data.image_height
                ? data.image_width / data.image_height
                : 1920 / 1080,
          }}
          contentFit="contain"
        />
      )}

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
