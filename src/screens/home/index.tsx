import { getPublicEssays } from "@/src/api/essaysRepo";
import EssayFeed from "@/src/components/essayFeed";
import EssayFeedContext from "@/src/components/essayFeed/context/EssayFeedContext";
import { PublicFilteringValue } from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import Container from "@/src/ui/Container";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function HomeScreen() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [filteringCriteria, setFilteringCriteria] = useState<
    PublicFilteringValue[]
  >([]);
  const [sortingCriteria, setSortingCriteria] =
    useState<SortingValue>("created_at");

  const {
    data,
    isPending,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      queryKeyPrefixes.publicFeed,
      filteringCriteria,
      searchPrompt,
      sortingCriteria,
    ],
    queryFn: ({ pageParam }) =>
      getPublicEssays(
        filteringCriteria,
        searchPrompt,
        sortingCriteria,
        pageParam,
      ),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      createdAt: "",
      bandScore: 0,
      reactionsCount: 0,
    },
  });

  return (
    <Container topAlignment>
      <EssayFeedContext.Provider
        value={{
          type: "public",
          searchPrompt,
          setSearchPrompt,
          filteringCriteria,
          setFilteringCriteria,
          sortingCriteria,
          setSortingCriteria,
          data: data?.pages.flatMap((page) => page.items),
          isPending,
          error,
          isError,
          hasNextPage,
          fetchNextPage,
          isFetchingNextPage,
        }}
      >
        <EssayFeed />
      </EssayFeedContext.Provider>
    </Container>
  );
}
