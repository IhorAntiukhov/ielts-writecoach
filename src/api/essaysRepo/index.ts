import {
  PrivateFilteringValue,
  PublicFilteringValue,
} from "@/src/components/filterSelect/types/filteringValue";
import SortingValue from "@/src/components/sortSelect/types/sortingValue";
import {
  InsertEssayParams,
  UpdateEssayParams,
} from "@/src/screens/essay/private/types/saveEssayParams";
import supabase from "../supabaseClient";
import {
  createPrivateFeedBaseQuery,
  createPublicFeedBaseQuery,
} from "./constants/baseQueries";
import PAGE_SIZE from "./constants/pageSize";
import { ApplyFiltersParams } from "./types/applyFiltersParams";
import {
  PrivateFeedBaseQueryType,
  PublicFeedBaseQueryType,
} from "./types/baseQueryTypes";
import Cursor from "./types/cursorType";
import { PrivateFeedEssay, PublicFeedEssay } from "./types/feedEssayTypes";

export async function getPublicEssay(id: number) {
  const { data, error } = await supabase
    .from("essays")
    .select("*, reviews ( * ), reactions ( * ), profiles ( * )")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getPrivateEssay(id: number) {
  const { data, error } = await supabase
    .from("essays")
    .select("*, reviews ( * ), reactions ( * )")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getPublicEssays(
  filteringCriteria: PublicFilteringValue[],
  searchPrompt: string,
  sortingCriteria: SortingValue,
  cursor?: Cursor,
) {
  let query = createPublicFeedBaseQuery();

  query = applyFilters({
    type: "public",
    query,
    filteringCriteria,
    searchPrompt,
    sortingCriteria,
    cursor,
  }) as PublicFeedBaseQueryType;

  const { data, error } = await query;

  if (error) throw error;

  return getItemsWithNextCursor(data);
}

export async function getPrivateEssays(
  userId: string,
  filteringCriteria: PrivateFilteringValue[],
  searchPrompt: string,
  sortingCriteria: SortingValue,
  cursor?: Cursor,
) {
  let query = createPrivateFeedBaseQuery(userId);

  query = applyFilters({
    type: "private",
    query,
    filteringCriteria,
    searchPrompt,
    sortingCriteria,
    cursor,
  }) as PrivateFeedBaseQueryType;

  const { data, error } = await query;

  if (error) throw error;

  return getItemsWithNextCursor(data);
}

function applyFilters({
  type,
  query,
  filteringCriteria,
  searchPrompt,
  sortingCriteria,
  cursor,
}: ApplyFiltersParams) {
  const essayTypeFilters = filteringCriteria.filter(
    (filter) =>
      filter === "task-1A" || filter === "task-1G" || filter === "task-2",
  ) as ("task-1A" | "task-1G" | "task-2")[];
  if (essayTypeFilters.length) query = query.in("type", essayTypeFilters);
  if (filteringCriteria.includes("not-analyzed"))
    query = query.is("review_id", null);
  if (
    type === "private" &&
    (filteringCriteria as PrivateFilteringValue[]).includes("public")
  )
    query = query.eq("is_public", true);

  if (searchPrompt.trim().length > 0)
    query = query.textSearch("ts_vector", searchPrompt, {
      type: "websearch",
    });

  query = query.order(sortingCriteria, {
    ascending: false,
  });
  if (sortingCriteria !== "created_at")
    query = query.order("created_at", {
      ascending: false,
    });

  if (cursor?.createdAt) {
    if (sortingCriteria === "created_at")
      query = query.lte("created_at", cursor.createdAt);
    else {
      const mainSortingComparison = (operator: "lt" | "eq") =>
        `${sortingCriteria}.${operator}.${sortingCriteria === "average_band_score" ? cursor.bandScore : cursor.reactionsCount}`;
      query = query.or(
        `${mainSortingComparison("lt")},and(${mainSortingComparison("eq")},created_at.lte.${cursor.createdAt})`,
      );
    }
  }

  return query;
}

function getItemsWithNextCursor<
  T extends PublicFeedEssay[] | PrivateFeedEssay[],
>(data: T) {
  const hasNextPage = data.length > PAGE_SIZE;
  const items = data.slice(0, PAGE_SIZE);

  return {
    items: items as T,
    nextCursor: hasNextPage
      ? {
          createdAt: data[data.length - 1].created_at!,
          bandScore: data[data.length - 1].average_band_score!,
          reactionsCount: data[data.length - 1].reactions_count!,
        }
      : null,
  };
}

export async function insertEssay({
  type,
  instructions,
  imageUrl,
  imageWidth,
  imageHeight,
  time,
  wordCount,
  response,
  userId,
}: InsertEssayParams) {
  const { data, error } = await supabase
    .from("essays")
    .insert({
      type,
      instructions,
      image_url: imageUrl,
      image_width: imageWidth,
      image_height: imageHeight,
      time,
      word_count: wordCount,
      response,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateEssay(
  id: number,
  data: Partial<UpdateEssayParams>,
) {
  const { error } = await supabase
    .from("essays")
    .update({
      type: data.type,
      instructions: data.instructions,
      image_url: data.imageUrl,
      image_width: data.imageWidth,
      image_height: data.imageHeight,
      time: data.time,
      word_count: data.wordCount,
      response: data.response,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function updateEssayPrivacy(id: number, isPublic: boolean) {
  const { error } = await supabase
    .from("essays")
    .update({
      is_public: isPublic,
    })
    .eq("id", id);

  if (error) throw error;

  return isPublic;
}

export async function deleteEssay(id: number) {
  const { error } = await supabase.from("essays").delete().eq("id", id);

  if (error) throw error;
}
