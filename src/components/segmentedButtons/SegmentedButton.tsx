import { Button, ButtonText } from "@/components/ui/button";
import { clsx } from "clsx";
import { TabTriggerSlotProps } from "expo-router/ui";
import React from "react";
import { View } from "react-native";

interface SegmentedButtonProps extends TabTriggerSlotProps {
  index: number;
  length: number;
  label: string;
}

const SegmentedButton = React.forwardRef<View, SegmentedButtonProps>(
  ({ index, length, label, isFocused, className, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="md"
        className={clsx(
          "flex-1 rounded-b-none active:opacity-60",
          index === 0 && "rounded-tl-lg rounded-r-none border-r-[0.5px]",
          index > 0 &&
            index < length - 1 &&
            "rounded-none border-r-[0.5px] border-l-[0.5px]",
          index === length - 1 &&
            "rounded-tr-lg rounded-l-none border-l-[0.5px]",
          isFocused && "bg-background-info",
        )}
        {...rest}
      >
        <View className="w-full flex items-center">
          <ButtonText>{label}</ButtonText>
        </View>
      </Button>
    );
  },
);

SegmentedButton.displayName = "SegmentedButton";

export default SegmentedButton;
