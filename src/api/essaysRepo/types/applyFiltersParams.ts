import {
  PrivateFeedBaseQueryType,
  PublicFeedBaseQueryType,
} from "./baseQueryTypes";
import {
  GetPrivateEssayFeedParams,
  GetPublicEssayFeedParams,
} from "./getEssayFeedParams";

interface ApplyFiltersForPublicParams extends GetPublicEssayFeedParams {
  type: "public";
  query: PublicFeedBaseQueryType;
}

interface ApplyFiltersForPrivateParams extends GetPrivateEssayFeedParams {
  type: "private";
  query: PrivateFeedBaseQueryType;
}

export type ApplyFiltersParams =
  | ApplyFiltersForPublicParams
  | ApplyFiltersForPrivateParams;
