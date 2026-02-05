import FilteringValue from "../components/filterSelect/types/filteringValue";
import SortingValue from "../components/sortSelect/types/sortingValue";
import {
  InsertEssayParams,
  UpdateEssayParams,
} from "../screens/essay/types/saveEssayParams";
import supabase from "./supabaseClient";

const PAGE_SIZE = 4;

export async function getEssay(id: number) {
  const { data, error } = await supabase
    .from("essays")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getPrivateEssays(
  userId: string,
  filteringCriteria: FilteringValue[],
  searchPrompt: string,
  sortingCriteria: SortingValue,
  cursor?: { createdAt: string; bandScore: number },
) {
  let query = supabase
    .from("essay_feed")
    .select("*")
    .eq("user_id", userId)
    .limit(PAGE_SIZE + 1);

  const essayTypeFilters = filteringCriteria.filter(
    (filter) =>
      filter === "task-1A" || filter === "task-1G" || filter === "task-2",
  );
  if (essayTypeFilters.length) query = query.in("type", essayTypeFilters);
  if (filteringCriteria.includes("not-analyzed"))
    query = query.is("review_id", null);
  if (filteringCriteria.includes("public")) query = query.eq("is_public", true);

  if (searchPrompt)
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
        `${sortingCriteria}.${operator}.${sortingCriteria === "average_band_score" ? cursor.bandScore : cursor.bandScore}`;
      query = query.or(
        `${mainSortingComparison("lt")},and(${mainSortingComparison("eq")},created_at.lte.${cursor.createdAt})`,
      );
    }
  }

  const { data, error } = await query;

  if (error) throw error;

  const hasNextPage = data.length > PAGE_SIZE;
  const items = data.slice(0, PAGE_SIZE);

  return {
    items,
    nextCursor: hasNextPage
      ? {
          createdAt: data[data.length - 1].created_at!,
          bandScore: data[data.length - 1].average_band_score!,
        }
      : null,
  };
}

export type PrivateEssay = Awaited<
  ReturnType<typeof getPrivateEssays>
>["items"][number];

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

export async function deleteEssay(id: number) {
  const { error } = await supabase.from("essays").delete().eq("id", id);

  if (error) throw error;
}
