import { HStack } from "@/components/ui/hstack";
import {
  reactionColors,
  reactionColorToIcon,
} from "@/src/constants/reactionColors";
import React from "react";
import { Text, View } from "react-native";
import ReactionIndex from "../../types/reactionIndex";

interface LineLegendProps {
  reactionIndex: ReactionIndex;
}

export default function ReactionBarLegend({ reactionIndex }: LineLegendProps) {
  return (
    <HStack space="sm" className="items-center">
      <View
        className="size-5 rounded-full"
        style={{
          backgroundColor: reactionColors[reactionIndex],
        }}
      ></View>

      <Text className="text-md text-typography-950">
        {reactionColorToIcon[reactionIndex]}
      </Text>
    </HStack>
  );
}
