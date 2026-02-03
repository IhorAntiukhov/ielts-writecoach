import { HStack } from "@/components/ui/hstack";
import EssayFeedContext from "@/src/screens/private/context/EssayFeedContext";
import React, { use } from "react";
import { ScrollView } from "react-native";
import SortingOption from "./components/SortingOption";
import sortingOptions from "./constants/sortingOptions";

export default function SortSelect() {
  const { sortingCriteria, setSortingCriteria } = use(EssayFeedContext)!;

  return (
    <ScrollView horizontal>
      <HStack space="sm">
        {sortingOptions.map(({ value: buttonValue, label }, index) => (
          <SortingOption
            key={index}
            value={sortingCriteria}
            setValue={setSortingCriteria}
            buttonValue={buttonValue}
            label={label}
          />
        ))}
      </HStack>
    </ScrollView>
  );
}
