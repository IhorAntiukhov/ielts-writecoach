import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Href } from "expo-router";
import { TabTrigger } from "expo-router/ui";
import React from "react";
import { View } from "react-native";
import SegmentedButton from "./SegmentedButton";

interface SegmentedButtonsProps {
  buttons: {
    title: string;
    name: string;
    href: Href;
  }[];
}

export default function SegmentedButtons({ buttons }: SegmentedButtonsProps) {
  return (
    <View className="relative -mx-8 -mt-6">
      <View className="flex flex-row">
        {buttons.map(({ title, name, href }, index) => (
          <TabTrigger key={index} name={name} href={href} asChild>
            <SegmentedButton
              index={index}
              length={buttons.length}
              label={title}
            />
          </TabTrigger>
        ))}
        <Avatar className="absolute t-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <AvatarImage source={require("@/assets/images/icon.png")} />
        </Avatar>
      </View>
    </View>
  );
}
