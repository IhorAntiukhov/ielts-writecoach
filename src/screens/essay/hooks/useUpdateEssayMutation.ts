import useToast from "@/src/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { EssayNavigationContext } from "../context/EssayNavigationProvider";
import { UpdateEssayParams } from "../types/saveEssayParams";
import UseEssayMutationParams from "../types/useEssayMutationParams";

export default function useUpdateEssayMutation<T extends UpdateEssayParams>({
  mutationFn,
  setIsTimerRunning,
  toastTitle,
  toastSuccessMessage,
  redirectToReview,
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
        queryKey: ["private"],
      });

      redirectToReview && setNavigationIntent?.("review");
    },
    onError: (error) => {
      toast("error", toastTitle, error.message);
    },
  });

  return { mutate, isPending };
}
