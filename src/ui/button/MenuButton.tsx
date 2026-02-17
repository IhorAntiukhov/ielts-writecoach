import { HStack } from "@/components/ui/hstack";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import React from "react";
import { Pressable, View } from "react-native";

interface MenuButtonProps<T extends string> {
  onChange: (value: T) => void;
  trigger: React.ReactNode;
  options: {
    icon: React.JSX.Element;
    value: T;
    label: string;
  }[];
}

export default function MenuButton<T extends string>({
  onChange,
  trigger,
  options,
}: MenuButtonProps<T>) {
  return (
    <Menu
      onSelectionChange={([key]) => onChange(key.toString() as T)}
      placement="top"
      offset={10}
      selectionMode="single"
      trigger={({ ...triggerProps }) => {
        return <Pressable {...triggerProps}>{trigger}</Pressable>;
      }}
      closeOnSelect
    >
      {options.map(({ icon, value, label }) => (
        <MenuItem key={value} textValue={value}>
          <HStack space="md" className="items-center">
            <View className="h-auto aspect-square">{icon}</View>

            <MenuItemLabel size="sm">{label}</MenuItemLabel>
          </HStack>
        </MenuItem>
      ))}
    </Menu>
  );
}
