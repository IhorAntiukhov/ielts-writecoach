import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import useToast from "@/src/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { EssayNavigationContext } from "../../shared/context/EssayNavigationProvider";
import { UpdateEssayParams } from "../types/saveEssayParams";
import UseEssayMutationParams from "../types/useEssayMutationParams";

export default function useUpdateEssayMutation<T extends UpdateEssayParams>({
  mutationFn,
  setIsTimerRunning,
  toastTitle,
  toastSuccessMessage,
  redirectToReview,
  isPublic,
}: UseEssayMutationParams<T, void>) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { setNavigationIntent } = use(EssayNavigationContext)!;

  const { mutate, isPending } = useMutation({
    mutationFn,
    onMutate: () => {
      setIsTimerRunning(false);
    },
    onSuccess: () => {
      toast("success", toastTitle, toastSuccessMessage);

      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryKeyPrefixes.privateFeed ||
          !!(isPublic && queryKey[0] === queryKeyPrefixes.publicFeed),
      });

      redirectToReview && setNavigationIntent?.("review");
    },
    onError: (error) => {
      toast("error", toastTitle, error.message);
    },
  });

  return { mutate, isPending };
}
