import ReactionType from "../types/reactionType";
import supabase from "./supabaseClient";

export async function handleEssayReaction(
  reactionType: ReactionType,
  essayId: number,
  userId: string,
) {
  const { error } = await supabase.rpc("handle_essay_reaction", {
    reaction_type: reactionType,
    essay_id: essayId,
    user_id: userId,
  });

  if (error) throw error;
}
