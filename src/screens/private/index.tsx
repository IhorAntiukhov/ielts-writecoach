import { getPrivateEssays } from "@/src/api/essaysRepo";
import EssayFeed from "@/src/components/essayFeed";
import FilteringValue from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AuthContext } from "@/src/context/AuthProvider";
import Container from "@/src/ui/Container";
import { useInfiniteQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import EssayFeedContext from "./context/EssayFeedContext";

export default function PrivateScreen() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [filteringCriteria, setFilteringCriteria] = useState<FilteringValue[]>(
    [],
  );
  const [sortingCriteria, setSortingCriteria] =
    useState<SortingValue>("created_at");

  const { user } = use(AuthContext).session!;

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
      queryKeyPrefixes.privateFeed,
      user.id,
      filteringCriteria,
      searchPrompt,
      sortingCriteria,
    ],
    queryFn: ({ pageParam }) =>
      getPrivateEssays(
        user.id,
        filteringCriteria,
        searchPrompt,
        sortingCriteria,
        pageParam,
      ),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      createdAt: "",
      bandScore: 0,
    },
  });

  return (
    <Container topAlignment>
      <EssayFeedContext.Provider
        value={{
          searchPrompt,
          setSearchPrompt,
          filteringCriteria,
          setFilteringCriteria,
          sortingCriteria,
          setSortingCriteria,
          apiData: {
            data: data?.pages.flatMap((page) => page.items),
            isPending,
            error,
            isError,
            hasNextPage,
            fetchNextPage,
            isFetchingNextPage,
          },
        }}
      >
        <EssayFeed />
      </EssayFeedContext.Provider>
    </Container>
  );
}
