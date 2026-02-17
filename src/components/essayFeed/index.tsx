import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import EssayFeedContext from "@/src/components/essayFeed/context/EssayFeedContext";
import IndicatorText from "@/src/ui/IndicatorText";
import SkeletonCard from "@/src/ui/SkeletonCard";
import { use } from "react";
import { FlatList, FlatListProps } from "react-native";
import FilterSelect from "../filterSelect";
import SortSelect from "../sortSelect";
import NewEssayButton from "./components/NewEssayButton";
import PrivateEssayCard from "./components/PrivateEssayCard";
import PublicEssayCard from "./components/PublicEssayCard";
import SearchBar from "./components/SearchBar";

export default function EssayFeed() {
  const {
    type,
    filteringCriteria,
    searchPrompt,
    data,
    isPending,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = use(EssayFeedContext)!;

  const flatListProps: Partial<FlatListProps<any>> = {
    keyExtractor: (item) => item.id!.toString(),
    contentContainerClassName: "gap-4",
    onEndReached: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    onEndReachedThreshold: 0.4,
    ListFooterComponent: () =>
      isFetchingNextPage && (
        <Spinner size={32} className="text-typography-950" />
      ),
  };

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
            ? `${type === "public" ? "There are no" : "You do not have any"} essays that meet the selected filter criteria`
            : searchPrompt
              ? "No essays found"
              : `${type === "public" ? "There are no" : "You haven't created any"} essays yet`}
        </IndicatorText>
      ) : type === "public" ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <PublicEssayCard data={item} />}
          {...flatListProps}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <PrivateEssayCard data={item} />}
          ListHeaderComponent={<NewEssayButton />}
          {...flatListProps}
        />
      )}
    </VStack>
  );
}
