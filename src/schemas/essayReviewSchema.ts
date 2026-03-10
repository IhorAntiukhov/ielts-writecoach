import * as zod from "zod";

const feedbackSchema = zod.object({
  strength: zod.string().describe("One clear strength"),
  weakness: zod.string().describe("One clear weakness"),
  improvement: zod.string().describe("1–2 concrete examples of improvements"),
});

const essayReviewSchema = zod.object({
  taskResponseBand: zod.number().describe("Band score for Task Response"),
  taskResponseFeedback: feedbackSchema.describe(
    "Detailed feedback for Task Response",
  ),
  coherenceBand: zod.number().describe("Band score for Coherence and Cohesion"),
  coherenceFeedback: feedbackSchema.describe(
    "Detailed feedback for Coherence & Cohesion",
  ),
  lexicalResourceBand: zod.number().describe("Band score for Lexical Resource"),
  lexicalResourceFeedback: feedbackSchema.describe(
    "Detailed feedback for Lexical Resource",
  ),
  grammaticalRangeBand: zod
    .number()
    .describe("Band score for Grammatical range and Accuracy"),
  grammaticalRangeFeedback: feedbackSchema.describe(
    "Detailed feedback for Grammatical range and Accuracy",
  ),
});

export default essayReviewSchema;
