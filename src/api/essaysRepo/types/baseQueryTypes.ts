import {
  createPrivateFeedBaseQuery,
  createPublicFeedBaseQuery,
} from "../constants/baseQueries";

export type PublicFeedBaseQueryType = ReturnType<
  typeof createPublicFeedBaseQuery
>;
export type PrivateFeedBaseQueryType = ReturnType<
  typeof createPrivateFeedBaseQuery
>;
