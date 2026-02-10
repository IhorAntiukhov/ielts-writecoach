import { QueryData } from "@supabase/supabase-js";
import {
  PrivateFeedBaseQueryType,
  PublicFeedBaseQueryType,
} from "./baseQueryTypes";

export type PublicEssay = QueryData<PublicFeedBaseQueryType>[number];
export type PrivateEssay = QueryData<PrivateFeedBaseQueryType>[number];
