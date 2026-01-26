import {
  InsertEssayParams,
  UpdateEssayParams,
} from "../screens/essay/types/saveEssayParams";
import supabase from "./supabaseClient";

export async function insertEssay({
  type,
  instructions,
  image,
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
      image,
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
  data: Omit<UpdateEssayParams, "mimeType">,
) {
  const { error } = await supabase.from("essays").update(data).eq("id", id);

  if (error) throw error;
}
