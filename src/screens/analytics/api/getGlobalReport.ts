import TimeIntervalType from "../types/timeInterval";

export default async  function getGlobalReport(timeInterval: TimeIntervalType) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MEDIUM,
      },
      systemInstruction,
      responseMimeType: "application/json",
      responseJsonSchema: essayReviewSchema.toJSONSchema(),
    },
  });
}