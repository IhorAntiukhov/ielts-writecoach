import { TabListProps } from "expo-router/ui";
import React from "react";
import { View } from "react-native";
import NewEssayButton from "./NewEssayButton";

type CustomTabListProps = React.PropsWithChildren & TabListProps;

const TabBar = React.forwardRef<View, CustomTabListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <View className="relative">
        <NewEssayButton />

        <View
          ref={ref}
          className="flex flex-row items-center px-6 py-2 bg-secondary-300"
          {...rest}
        >
          {children}
        </View>
      </View>
    );
  },
);

TabBar.displayName = "CustomTabList";

export default TabBar;
