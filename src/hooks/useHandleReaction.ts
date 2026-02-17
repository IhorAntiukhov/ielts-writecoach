import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { handleEssayReaction } from "../api/reactionsRepo";
import queryKeyPrefixes from "../constants/queryKeyPrefixes";
import { AuthContext } from "../context/AuthProvider";
import ReactionType from "../types/reactionType";
import useToast from "./useToast";

export default function useHandleReaction(
  essayId: number,
  isInEssayScreen: boolean,
) {
  const { user } = use(AuthContext).session!;
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate: handleEssayReactionMutation, isPending } = useMutation({
    mutationFn: (reactionType: ReactionType) =>
      handleEssayReaction(reactionType, essayId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === queryKeyPrefixes.publicFeed ||
          (isInEssayScreen &&
            query.queryKey[0] === queryKeyPrefixes.publicEssay &&
            query.queryKey[1] === essayId),
      });
    },
    onError: (error) => {
      toast("error", "Handle reaction", error.message);
    },
  });

  return { handleEssayReactionMutation, isPending };
}
