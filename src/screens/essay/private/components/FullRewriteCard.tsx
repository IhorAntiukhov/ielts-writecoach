import { VStack } from "@/components/ui/vstack";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import useToast from "@/src/hooks/useToast";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import CardBox from "@/src/ui/CardBox";
import SkeletonCard from "@/src/ui/SkeletonCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PenLine } from "lucide-react-native";
import { use } from "react";
import { Text } from "react-native";
import EssayDataContext from "../../shared/context/EssayDataContext";
import getFullRewrite from "../api/getFullRewrite";

export default function FullRewriteCard() {
  const essayData = use(EssayDataContext)!;

  const queryClient = useQueryClient();
  const toast = useToast();

  if (essayData.type !== "private") throw Error("Essay must be private");

  const { data, isPending: isDataLoading } = essayData;

  const review = data!.reviews[0];

  const { mutate: getFullRewriteMutation, isPending } = useMutation({
    mutationFn: () =>
      getFullRewrite(data!.id, data!.instructions, data!.type, data!.response),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryKeyPrefixes.privateEssay &&
          queryKey[1] === data?.id,
      });
    },
    onError: (error) => {
      toast("error", "Failed to get full rewrite", error.message);
    },
  });

  if (isDataLoading || !review) return <SkeletonCard />;

  return (
    <CardBox>
      <VStack space="2xl">
        <Text className="text-xl font-bold text-typography-950">
          Full rewrite
        </Text>

        {review.full_rewrite && (
          <Text className="text-typography-950 text-md">
            {review.full_rewrite}
          </Text>
        )}

        <PrimaryButton
          icon={PenLine}
          isLoading={isPending}
          onPress={() => getFullRewriteMutation()}
        >
          Get full essay rewrite
        </PrimaryButton>
      </VStack>
    </CardBox>
  );
}
