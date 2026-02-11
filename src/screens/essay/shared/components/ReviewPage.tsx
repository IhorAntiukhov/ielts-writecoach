import { VStack } from "@/components/ui/vstack";
import IndicatorText from "@/src/ui/IndicatorText";
import { useLocalSearchParams } from "expo-router";
import { use } from "react";
import EssayDataContext from "../context/EssayDataContext";
import ReviewCategory from "./ReviewCategory";

export default function ReviewPage() {
  const { id } = useLocalSearchParams();

  const isNewEssay = id === "new-essay";

  const { type, data, error, isPending, isError } = use(EssayDataContext)!;

  const review = data?.reviews[0];

  return (
    <VStack space="2xl">
      {!review && (!isPending || isNewEssay) ? (
        <IndicatorText>
          {`${type === "private" ? "You haven't" : "The user hasn't"} generated an AI review yet`}
        </IndicatorText>
      ) : isError ? (
        <IndicatorText isError>
          Failed to get the review data: {error?.message}
        </IndicatorText>
      ) : (
        <>
          <ReviewCategory
            title="Task Response"
            bandScore={review?.task_response_band}
            detailedFeedback={review?.task_response_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Coherence & Cohesion"
            bandScore={review?.coherence_band}
            detailedFeedback={review?.coherence_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Lexical Resource"
            bandScore={review?.vocabulary_band}
            detailedFeedback={review?.vocabulary_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Grammatical range & Accuracy"
            bandScore={review?.grammar_band}
            detailedFeedback={review?.grammar_feedback}
            isLoading={isPending}
          />

          <ReviewCategory
            title="Overall Estimated Band"
            bandScore={
              review?.average_band_score
                ? Math.round(review?.average_band_score * 2) / 2
                : undefined
            }
            isLoading={isPending}
          />
        </>
      )}
    </VStack>
  );
}
