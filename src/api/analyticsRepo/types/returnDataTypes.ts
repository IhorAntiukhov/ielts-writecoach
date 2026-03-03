import {
  GetUserEssayAnalyticsDataType,
  GetUserEssayCountsDataType,
  GetUserReactionCountsDataType,
} from "./baseQueryTypes";

export type GetUserEssayCountsReturnType = {
  type: "essayCounts";
  items: GetUserEssayCountsDataType;
};

export type GetUserEssayAnalyticsReturnType = {
  type: "userAnalytics";
  items: GetUserEssayAnalyticsDataType;
};

export type GetUserReactionCountsReturnType = {
  type: "reactionCounts";
  items: GetUserReactionCountsDataType;
};

export type AnalyticsDataType = (
  | GetUserEssayCountsReturnType
  | GetUserEssayAnalyticsReturnType
  | GetUserReactionCountsReturnType
  | undefined
)[];
