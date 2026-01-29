import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import {
  getAiPromptTemplate,
  systemInstruction,
} from "../constants/aiPromptTemplate";
import essayReviewSchema from "../schemas/essayReviewSchema";
import AiPromptEssayType from "../types/aiPromptEssayType";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

export default async function generateEssayReview(
  instructions: string,
  taskType: AiPromptEssayType,
  essay: string,
  base64Image?: string,
  mimeType?: string,
) {
  const text = getAiPromptTemplate(
    taskType,
    !!(base64Image && mimeType),
    instructions,
    essay,
  );

  const contents =
    base64Image && mimeType
      ? [
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
          {
            text,
          },
        ]
      : text;

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

  return response;
}
