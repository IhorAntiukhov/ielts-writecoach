import { HStack } from "@/components/ui/hstack";
import EssayType from "@/src/types/essayType";
import formatEssayType from "@/src/utils/formatEssayType";
import React from "react";
import { Text, View } from "react-native";
import essayTypeColors from "../../constants/essayTypeColors";

interface EssayTypeLegendProps {
  essayType: EssayType;
}

export default function EssayTypeLegend({ essayType }: EssayTypeLegendProps) {
  return (
    <HStack space="sm" className="items-center">
      <View
        className="size-5 rounded-full"
        style={{
          backgroundColor: essayTypeColors[essayType],
        }}
      ></View>

      <Text className="text-md text-typography-950">
        {formatEssayType(essayType)}
      </Text>
    </HStack>
  );
}
