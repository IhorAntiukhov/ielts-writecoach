import { HStack } from "@/components/ui/hstack";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MenuButtonProps<T extends string> {
  onChange: (value: T) => void;
  trigger: React.ReactNode;
  options: {
    icon: React.JSX.Element;
    value: T;
    label: string;
  }[];
  disabled?: boolean;
}

export default function MenuButton<T extends string>({
  onChange,
  trigger,
  options,
  disabled,
}: MenuButtonProps<T>) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Menu
      onSelectionChange={([key]) => {
        onChange(key.toString() as T);
      }}
      placement="top"
      offset={10 + (Platform.OS !== "web" ? bottom : 0)}
      selectionMode="single"
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps} disabled={disabled}>
            {trigger}
          </Pressable>
        );
      }}
    >
      {options.map(({ icon, value, label }) => (
        <MenuItem
          key={value}
          textValue={value}
          onPress={Platform.OS === "web" ? () => onChange(value) : undefined}
        >
          <HStack space="md" className="items-center">
            <View className="h-auto aspect-square">{icon}</View>

            <MenuItemLabel size="sm">{label}</MenuItemLabel>
          </HStack>
        </MenuItem>
      ))}
    </Menu>
  );
}
