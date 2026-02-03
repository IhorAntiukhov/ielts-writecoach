import { PrivateEssay } from "@/src/api/essaysRepo";
import FilteringValue from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import { createContext } from "react";

interface EssayFeedContextProps {
  searchPrompt: string;
  setSearchPrompt: React.Dispatch<React.SetStateAction<string>>;
  filteringCriteria: FilteringValue[];
  setFilteringCriteria: React.Dispatch<React.SetStateAction<FilteringValue[]>>;
  sortingCriteria: SortingValue;
  setSortingCriteria: React.Dispatch<React.SetStateAction<SortingValue>>;
  apiData: {
    data: PrivateEssay[] | undefined;
    isPending: boolean;
    error: Error | null;
    isError: boolean;
  };
}

const EssayFeedContext = createContext<EssayFeedContextProps | null>(null);

export default EssayFeedContext;
