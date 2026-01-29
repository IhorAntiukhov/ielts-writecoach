import supabase from "./supabaseClient";

interface SaveEssayReviewParams {
  taskResponseBand: number;
  taskResponseFeedback: string;
  coherenceBand: number;
  coherenceFeedback: string;
  vocabularyBand: number;
  vocabularyFeedback: string;
  grammarBand: number;
  grammarFeedback: string;
  essayId: number;
  userId: string;
}

export async function saveEssayReview(data: SaveEssayReviewParams) {
  const { error } = await supabase.rpc("save_essay_analysis", {
    task_response_band: data.taskResponseBand,
    task_response_feedback: data.taskResponseFeedback,
    coherence_band: data.coherenceBand,
    coherence_feedback: data.coherenceFeedback,
    vocabulary_band: data.vocabularyBand,
    vocabulary_feedback: data.vocabularyFeedback,
    grammar_band: data.grammarBand,
    grammar_feedback: data.grammarFeedback,
    essay_id: data.essayId,
    user_id: data.userId,
  });

  if (error) throw error;
}

export async function getEssayReview(essayId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("essay_id", essayId)
    .single();

  if (error) throw error;

  return data;
}
