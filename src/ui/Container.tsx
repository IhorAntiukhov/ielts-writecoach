import React from "react";
import { View } from "react-native";
import ChildrenProp from "../types/childrenProp";

export default function Container({ children }: ChildrenProp) {
  return (
    <View className="flex-1 flex justify-center items-center px-5 py-6 bg-background-50">
      {children}
    </View>
  );
}
