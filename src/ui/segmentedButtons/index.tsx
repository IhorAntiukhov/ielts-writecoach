import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ButtonGroup } from "@/components/ui/button";
import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";
import SegmentedButton from "./SegmentedButton";

interface SegmentedButtonsProps {
  value: number;
  onChange: (value: number) => void;
  buttons: string[];
  className?: string;
}

export default function SegmentedButtons({
  value,
  onChange,
  buttons,
  className,
}: SegmentedButtonsProps) {
  return (
    <View className={clsx("relative -mx-8 -mt-6", className)}>
      <ButtonGroup flexDirection="row" className="gap-0">
        {buttons.map((label, index) => (
          <SegmentedButton
            key={index}
            selectedIndex={value}
            index={index}
            length={buttons.length}
            label={label}
            onPress={onChange}
          />
        ))}
        <Avatar className="absolute t-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <AvatarImage source={require("@/assets/images/icon.png")} />
        </Avatar>
      </ButtonGroup>
    </View>
  );
}
