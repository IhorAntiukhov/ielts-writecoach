import * as zod from "zod";

const essayReviewSchema = zod.object({
  taskResponseBand: zod.number().describe("Band score for Task Response"),
  taskResponseFeedback: zod
    .string()
    .describe("Detailed feedback for Task Response"),
  coherenceBand: zod.number().describe("Band score for Coherence and Cohesion"),
  coherenceFeedback: zod
    .string()
    .describe("Detailed feedback for Coherence and Cohesion"),
  lexicalResourceBand: zod.number().describe("Band score for Lexical Resource"),
  lexicalResourceFeedback: zod
    .string()
    .describe("Detailed feedback for Lexical Resource"),
  grammaticalRangeBand: zod
    .number()
    .describe("Band score for Grammatical range and Accuracy"),
  grammaticalRangeFeedback: zod
    .string()
    .describe("Detailed feedback for Grammatical range and Accuracy"),
});

export default essayReviewSchema;
