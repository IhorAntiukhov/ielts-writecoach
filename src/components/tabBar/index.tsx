import useIsLargeScreen from "@/src/hooks/useIsLargeScreen";
import { clsx } from "clsx";
import { TabListProps } from "expo-router/ui";
import React from "react";
import { View } from "react-native";
import NewEssayButton from "./NewEssayButton";

type CustomTabListProps = React.PropsWithChildren & TabListProps;

const TabBar = React.forwardRef<View, CustomTabListProps>(
  ({ children, style, ...rest }, ref) => {
    const isLargeScreen = useIsLargeScreen();

    return (
      <View className="relative">
        <NewEssayButton />

        <View
          ref={ref}
          className={clsx(
            isLargeScreen ? "flex-1 p-3" : "flex-row px-6 py-2",
            "flex justify-center items-center bg-secondary-300",
          )}
          style={[
            style,
            {
              flexDirection: isLargeScreen ? "column" : "row",
            },
          ]}
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
