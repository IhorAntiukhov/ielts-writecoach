import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";
import SegmentedButton from "./SegmentedButton";

interface SegmentedButtonsProps<T extends string> {
  buttons: {
    title: string;
    pageName: T;
  }[];
  currentPage: T;
  setPage: (value: T) => void;
  noCard?: boolean;
}

export default function SegmentedButtons<T extends string>({
  buttons,
  currentPage,
  setPage,
  noCard,
}: SegmentedButtonsProps<T>) {
  return (
    <View className={clsx("relative", !noCard && "-mx-8 -mt-6")}>
      <View className="flex flex-row">
        {buttons.map(({ title, pageName }, index) => (
          <SegmentedButton
            key={index}
            index={index}
            length={buttons.length}
            label={title}
            isSelected={pageName === currentPage}
            onPress={() => setPage(pageName)}
          />
        ))}
        {!noCard && (
          <Avatar className="absolute t-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <AvatarImage source={require("@/assets/images/icon.png")} />
          </Avatar>
        )}
      </View>
    </View>
  );
}
