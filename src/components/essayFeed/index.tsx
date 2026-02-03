import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import EssayFeedContext from "@/src/screens/private/context/EssayFeedContext";
import IndicatorText from "@/src/ui/IndicatorText";
import SkeletonCard from "@/src/ui/SkeletonCard";
import { use } from "react";
import { FlatList } from "react-native";
import FilterSelect from "../filterSelect";
import SortSelect from "../sortSelect";
import PrivateEssayCard from "./components/PrivateEssayCard";
import SearchBar from "./components/SearchBar";

export default function EssayFeed() {
  const {
    filteringCriteria,
    apiData: { data, isPending, error, isError },
  } = use(EssayFeedContext)!;

  return (
    <VStack className="flex-1" space="2xl">
      <VStack space="xl">
        <SearchBar />

        <HStack space="xl" className="items-center">
          <FilterSelect />

          <SortSelect />
        </HStack>
      </VStack>

      {isPending ? (
        Array.from({ length: 3 }, (_, index) => <SkeletonCard key={index} />)
      ) : isError ? (
        <IndicatorText isError>
          Failed to get essays: {error?.message}
        </IndicatorText>
      ) : !data?.length ? (
        <IndicatorText>
          {filteringCriteria.length
            ? "You do not have any essays that meet the selected filter criteria."
            : "You haven't created any essays yet."}
        </IndicatorText>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <PrivateEssayCard data={item} />}
          contentContainerClassName="gap-4"
        />
      )}
    </VStack>
  );
}
