import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";

interface ContainerProps extends React.PropsWithChildren {
  topAlignment?: boolean;
}

export default function Container({ topAlignment, children }: ContainerProps) {
  return (
    <View
      className={clsx(
        "flex-1 flex flex-col px-5 pt-8 pb-12 bg-background-50",
        !topAlignment && "justify-center",
      )}
    >
      {children}
    </View>
  );
}
