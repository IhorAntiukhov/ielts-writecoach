import { getPrivateEssays } from "@/src/api/essaysRepo";
import EssayFeed from "@/src/components/essayFeed";
import FilteringValue from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import { AuthContext } from "@/src/context/AuthProvider";
import Container from "@/src/ui/Container";
import { useQuery } from "@tanstack/react-query";
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

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["private", user.id, filteringCriteria, sortingCriteria],
    queryFn: () =>
      getPrivateEssays(user.id, filteringCriteria, sortingCriteria),
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
            data,
            isPending,
            error,
            isError,
          },
        }}
      >
        <EssayFeed />
      </EssayFeedContext.Provider>
    </Container>
  );
}
