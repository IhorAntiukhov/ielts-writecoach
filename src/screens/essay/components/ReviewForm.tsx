import { VStack } from "@/components/ui/vstack";
import { getEssayReview } from "@/src/api/reviewsRepo";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import ReviewCategory from "./ReviewCategory";

export default function ReviewForm() {
  const { id } = useLocalSearchParams();

  const isNewEssay = id === "new-essay";

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getEssayReview(Number(id as string)),
    enabled: !isNewEssay,
  });

  return (
    <VStack space="2xl">
      {!data && !isPending ? (
        <Text className="text-typography-500 text-xl text-center">
          You don&apos;t have an AI essay review
        </Text>
      ) : isError ? (
        <Text className="text-error-950 text-xl text-center">
          Failed to get the review data: {error.message}
        </Text>
      ) : (
        <>
          <ReviewCategory
            title="Task Response"
            bandScore={data?.task_response_band}
            detailedFeedback={data?.task_response_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Coherence & Cohesion"
            bandScore={data?.coherence_band}
            detailedFeedback={data?.coherence_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Lexical Resource"
            bandScore={data?.vocabulary_band}
            detailedFeedback={data?.vocabulary_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Grammatical range & Accuracy"
            bandScore={data?.grammar_band}
            detailedFeedback={data?.grammar_feedback}
            isLoading={isPending}
          />
        </>
      )}
    </VStack>
  );
}
