import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";

interface PagerProps<T extends string> {
  currentPage: T;
  pages: {
    page: T;
    component: React.ReactNode;
  }[];
}

export default function Pager<T extends string>({
  currentPage,
  pages,
}: PagerProps<T>) {
  return pages.map(({ page, component }, index) => (
    <View key={index} className={clsx(page !== currentPage && "hidden")}>
      {component}
    </View>
  ));
}
