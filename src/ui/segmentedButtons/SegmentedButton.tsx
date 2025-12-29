import { Button, ButtonText } from "@/components/ui/button";
import { clsx } from "clsx";
import React from "react";

interface SegmentedButtonProps {
  index: number;
  selectedIndex: number;
  length: number;
  label: string;
  onPress: (value: number) => void;
}

export default function SegmentedButton({
  index,
  selectedIndex,
  length,
  label,
  onPress,
}: SegmentedButtonProps) {
  return (
    <Button
      variant="outline"
      size="md"
      className={clsx(
        "flex-1 rounded-b-none active:opacity-60",
        index === 0 && "rounded-tl-lg rounded-r-none border-r-[0.5px]",
        index > 0 &&
          index < length - 1 &&
          "rounded-none border-r-[0.5px] border-l-[0.5px]",
        index === length - 1 && "rounded-tr-lg rounded-l-none border-l-[0.5px]",
        index === selectedIndex && "bg-background-info",
      )}
      onPress={() => onPress(index)}
    >
      <ButtonText>{label}</ButtonText>
    </Button>
  );
}
