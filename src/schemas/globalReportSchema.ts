import * as zod from "zod";

const globalReportSchema = zod.object({
  recurringStrengths: zod.array(zod.string()).describe("Recurring strengths"),
  recurringWeaknesses: zod.array(zod.string()).describe("Recurring weaknesses"),
  mostProminentWeakness: zod
    .string()
    .describe("The SINGLE most prominent weakness overall"),
  priorityRecommendations: zod
    .array(zod.string())
    .describe("3 clear, prioritized improvement recommendations"),
});

export default globalReportSchema;
