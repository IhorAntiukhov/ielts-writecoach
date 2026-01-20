import { Button, ButtonText } from "@/components/ui/button";
import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";

interface SegmentedButtonProps {
  index: number;
  length: number;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SegmentedButton({
  index,
  length,
  label,
  isSelected,
  onPress,
}: SegmentedButtonProps) {
  return (
    <Button
      variant="outline"
      size="md"
      onPress={onPress}
      className={clsx(
        "flex-1 rounded-b-none active:opacity-60",
        index === 0 && "rounded-tl-lg rounded-r-none border-r-[0.5px]",
        index > 0 &&
          index < length - 1 &&
          "rounded-none border-r-[0.5px] border-l-[0.5px]",
        index === length - 1 && "rounded-tr-lg rounded-l-none border-l-[0.5px]",
        isSelected && "bg-background-info",
      )}
    >
      <View className="w-full flex items-center">
        <ButtonText>{label}</ButtonText>
      </View>
    </Button>
  );
}
