import {
  PrivateFilteringValue,
  PublicFilteringValue,
} from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import Cursor from "./cursorType";

interface GetBaseEssayFeedParams {
  searchPrompt: string;
  sortingCriteria: SortingValue;
  cursor?: Cursor;
}

export interface GetPrivateEssayFeedParams extends GetBaseEssayFeedParams {
  filteringCriteria: PrivateFilteringValue[];
}

export interface GetPublicEssayFeedParams extends GetBaseEssayFeedParams {
  filteringCriteria: PublicFilteringValue[];
}
