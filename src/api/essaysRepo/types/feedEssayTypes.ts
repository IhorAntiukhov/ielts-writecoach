import { QueryData } from "@supabase/supabase-js";
import {
  PrivateFeedBaseQueryType,
  PublicFeedBaseQueryType,
} from "./baseQueryTypes";

export type PublicFeedEssay = QueryData<PublicFeedBaseQueryType>[number];
export type PrivateFeedEssay = QueryData<PrivateFeedBaseQueryType>[number];
