import useIsLargeScreen from "@/src/hooks/useIsLargeScreen";
import EssayType from "@/src/types/essayType";
import SmallCardBox from "@/src/ui/SmallCardBox";
import { getNounByNumber } from "@/src/utils/getNounByNumber";
import React from "react";
import { Text } from "react-native";

interface WordCounterProps {
  type: EssayType;
  responseWordCount: number;
}

export default function WordCounter({
  type,
  responseWordCount,
}: WordCounterProps) {
  const isLargeScreen = useIsLargeScreen();

  return (
    <SmallCardBox className="flex-grow">
      <Text className="text-typography-950 text-lg">
        {`${responseWordCount}/${type === "task-2" ? 250 : 150}${responseWordCount < 100 || isLargeScreen ? getNounByNumber(responseWordCount, " word") : ""}`}
      </Text>
    </SmallCardBox>
  );
}
