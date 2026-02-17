import { QueryData } from "@supabase/supabase-js";
import PAGE_SIZE from "./essaysRepo/constants/pageSize";
import supabase from "./supabaseClient";

export function getCommentsQuery() {
  return supabase
    .from("comments")
    .select(
      "id, created_at, text, essay_id, user_id, profiles ( user_name, avatar_url )",
    );
}

export type Comment = QueryData<ReturnType<typeof getCommentsQuery>>[number];

export async function getComments(essayId: number, cursor: string) {
  let query = getCommentsQuery()
    .eq("essay_id", essayId)
    .limit(PAGE_SIZE + 1)
    .order("created_at", {
      ascending: false,
    });

  if (!!cursor) query = query.lte("created_at", cursor);

  const { data, error } = await query;

  if (error) throw error;

  const hasNextPage = data.length > PAGE_SIZE;
  const items = data.slice(0, PAGE_SIZE);

  return {
    items: items,
    nextCursor: hasNextPage ? data[data.length - 1].created_at : null,
  };
}

export async function insertComment(
  text: string,
  essayId: number,
  userId: string,
) {
  const { error } = await supabase.from("comments").insert({
    text,
    essay_id: essayId,
    user_id: userId,
  });

  if (error) throw error;
}

export async function updateComment(text: string, id: number) {
  const { error } = await supabase
    .from("comments")
    .update({
      text,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteComment(id: number) {
  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) throw error;
}
