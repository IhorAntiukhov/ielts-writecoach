import { VStack } from "@/components/ui/vstack";
import { clsx } from "clsx";
import { TabTriggerSlotProps } from "expo-router/ui";
import { ChartColumn, CircleUser, Handshake, Rows3 } from "lucide-react-native";
import { cssInterop } from "nativewind";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TabProps extends TabTriggerSlotProps {
  title: string;
  icon: "Handshake" | "Rows3" | "ChartColumn" | "CircleUser";
}

const Tab = React.forwardRef<View, TabProps>(
  ({ title, icon, isFocused, ...rest }, ref) => {
    const Icon = cssInterop(
      icon === "Handshake"
        ? Handshake
        : icon === "Rows3"
          ? Rows3
          : icon === "ChartColumn"
            ? ChartColumn
            : CircleUser,
      {
        className: {
          target: "style",
          nativeStyleToProp: {
            color: true,
            width: true,
            height: true,
          },
        },
      },
    );

    return (
      <View className="flex items-center flex-1">
        <Pressable ref={ref} {...rest}>
          <VStack className="items-center">
            <Icon
              size={28}
              className={clsx(
                "items-center",
                isFocused ? "text-primary-600" : "text-typography-950",
              )}
            />
            <Text
              className={clsx(
                "items-center",
                isFocused ? "text-primary-600" : "text-typography-950",
              )}
            >
              {title}
            </Text>
          </VStack>
        </Pressable>
      </View>
    );
  },
);

Tab.displayName = "Tab";

export default Tab;
