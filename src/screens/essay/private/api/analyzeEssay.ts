import generateEssayReview from "@/src/api/gemini";
import { saveEssayReview } from "@/src/api/reviewsRepo";
import AiPromptEssayType from "@/src/types/aiPromptEssayType";
import {
  InsertEssayWithAnalysisParams,
  UpdateEssayWithAnalysisParams,
} from "../types/saveEssayParams";
import { saveExistingEssay, uploadNewEssay } from "./saveEssay";

export async function uploadNewEssayWithAnalysis(
  data: InsertEssayWithAnalysisParams,
) {
  const essayId = await uploadNewEssay(data);

  const feedback = await generateAndParseEssayReview(data);

  await saveEssayReview({
    ...formatEssayReviewObject(feedback),
    essayId,
    userId: data.userId,
  });

  return essayId;
}

export async function saveExistingEssayWithAnalysis(
  data: UpdateEssayWithAnalysisParams,
  essayId: number,
  userId: string,
) {
  await saveExistingEssay(data, essayId, userId);

  const feedback = await generateAndParseEssayReview(data);

  await saveEssayReview({
    ...formatEssayReviewObject(feedback),
    essayId,
    userId,
  });
}

function formatEssayReviewObject(feedback: any) {
  return {
    taskResponseBand: feedback.taskResponseBand,
    taskResponseFeedback: feedback.taskResponseFeedback,
    coherenceBand: feedback.coherenceBand,
    coherenceFeedback: feedback.coherenceFeedback,
    vocabularyBand: feedback.lexicalResourceBand,
    vocabularyFeedback: feedback.lexicalResourceFeedback,
    grammarBand: feedback.grammaticalRangeBand,
    grammarFeedback: feedback.grammaticalRangeFeedback,
  };
}

async function generateAndParseEssayReview(
  data: InsertEssayWithAnalysisParams | UpdateEssayWithAnalysisParams,
) {
  const taskType: AiPromptEssayType =
    data.type === "task-1A"
      ? "academic task 1"
      : data.type === "task-1G"
        ? "general writing task 1"
        : "task 2";

  const response = await generateEssayReview(
    data.instructions,
    taskType,
    data.response,
    data.base64,
    data.mimeType,
  );

  const feedback = response.candidates?.[0].content?.parts?.[0].text;

  if (!feedback) throw Error("Failed to generate Ai review");

  return JSON.parse(feedback);
}
