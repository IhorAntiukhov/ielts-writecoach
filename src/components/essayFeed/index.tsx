import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import useOpenNewEssay from "@/src/hooks/useOpenNewEssay";
import EssayFeedContext from "@/src/screens/private/context/EssayFeedContext";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import IndicatorText from "@/src/ui/IndicatorText";
import SkeletonCard from "@/src/ui/SkeletonCard";
import { Plus } from "lucide-react-native";
import { use } from "react";
import { FlatList } from "react-native";
import FilterSelect from "../filterSelect";
import SortSelect from "../sortSelect";
import PrivateEssayCard from "./components/PrivateEssayCard";
import SearchBar from "./components/SearchBar";

export default function EssayFeed() {
  const {
    filteringCriteria,
    searchPrompt,
    sortingCriteria,
    apiData: {
      data,
      isPending,
      error,
      isError,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    },
  } = use(EssayFeedContext)!;

  const { openNewEssay } = useOpenNewEssay();

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
          {filteringCriteria.length || sortingCriteria === "average_band_score"
            ? "You do not have any essays that meet the selected filter criteria"
            : searchPrompt
              ? "No essays found"
              : "You haven't created any essays yet"}
        </IndicatorText>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <PrivateEssayCard data={item} />}
          contentContainerClassName="gap-4"
          ListHeaderComponent={() => (
            <PrimaryButton icon={Plus} onPress={openNewEssay} className="mb-4">
              New essay
            </PrimaryButton>
          )}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isFetchingNextPage && (
              <Spinner size={32} className="text-typography-950" />
            )
          }
        />
      )}
    </VStack>
  );
}
