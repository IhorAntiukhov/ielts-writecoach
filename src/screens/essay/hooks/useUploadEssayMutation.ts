import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import useToast from "@/src/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { use } from "react";
import { EssayNavigationContext } from "../context/EssayNavigationProvider";
import { InsertEssayParams } from "../types/saveEssayParams";
import UseEssayMutationParams from "../types/useEssayMutationParams";

export default function useUploadEssayMutation<T extends InsertEssayParams>({
  mutationFn,
  setIsTimerRunning,
  toastTitle,
  toastSuccessMessage,
  redirectToReview,
}: UseEssayMutationParams<T, number>) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  const { setNavigationIntent } = use(EssayNavigationContext)!;

  const { mutate, isPending } = useMutation({
    mutationFn,
    onMutate: () => {
      setIsTimerRunning(false);
    },
    onSuccess: (id) => {
      toast("success", toastTitle, toastSuccessMessage);

      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryKeyPrefixes.privateFeed,
      });

      router.navigate({
        pathname: "/(tabs)/private/[id]",
        params: {
          id,
        },
      });

      redirectToReview && setNavigationIntent?.("review");
    },
    onError: (error) => {
      toast("error", toastTitle, error.message);
    },
  });

  return { mutate, isPending };
}
