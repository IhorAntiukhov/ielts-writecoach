import {
  InsertEssayParams,
  UpdateEssayParams,
} from "../screens/essay/types/saveEssayParams";
import supabase from "./supabaseClient";

export async function getEssay(id: number) {
  const { data, error } = await supabase
    .from("essays")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

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
  data: Partial<Omit<UpdateEssayParams, "mimeType">>,
) {
  const { error } = await supabase
    .from("essays")
    .update({
      type: data.type,
      instructions: data.instructions,
      image: data.image,
      time: data.time,
      word_count: data.wordCount,
      response: data.response,
    })
    .eq("id", id);

  if (error) throw error;
}
