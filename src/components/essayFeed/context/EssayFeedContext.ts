import {
  PrivateEssay,
  PublicEssay,
} from "@/src/api/essaysRepo/types/essayTypes";
import {
  PrivateFilteringValue,
  PublicFilteringValue,
} from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import { createContext } from "react";

interface BaseEssayFeedContextProps {
  searchPrompt: string;
  setSearchPrompt: React.Dispatch<React.SetStateAction<string>>;
  sortingCriteria: SortingValue;
  setSortingCriteria: React.Dispatch<React.SetStateAction<SortingValue>>;
  isPending: boolean;
  error: Error | null;
  isError: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => any;
  isFetchingNextPage: boolean;
}

interface PrivateEssayFeedContextProps extends BaseEssayFeedContextProps {
  type: "private";
  filteringCriteria: PrivateFilteringValue[];
  setFilteringCriteria: React.Dispatch<
    React.SetStateAction<PrivateFilteringValue[]>
  >;
  data?: PrivateEssay[];
}

interface PublicEssayFeedContextProps extends BaseEssayFeedContextProps {
  type: "public";
  filteringCriteria: PublicFilteringValue[];
  setFilteringCriteria: React.Dispatch<
    React.SetStateAction<PublicFilteringValue[]>
  >;
  data?: PublicEssay[];
}

type EssayFeedContextProps =
  | PrivateEssayFeedContextProps
  | PublicEssayFeedContextProps;

const EssayFeedContext = createContext<EssayFeedContextProps | null>(null);

export default EssayFeedContext;
