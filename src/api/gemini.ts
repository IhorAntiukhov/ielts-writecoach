import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import {
  getEssayAnalysisPrompt,
  getFullEssayRewritePrompt,
  systemInstruction,
} from "../constants/aiPromptTemplate";
import essayReviewSchema from "../schemas/essayReviewSchema";
import AiPromptEssayType from "../types/aiPromptEssayType";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

const model = "gemini-3.1-flash-lite-preview";

export async function generateEssayReview(
  instructions: string,
  taskType: AiPromptEssayType,
  essay: string,
  base64Image?: string,
  mimeType?: string,
) {
  const text = getEssayAnalysisPrompt(
    taskType,
    !!(base64Image && mimeType),
    instructions,
    essay,
  );

  const contents = getContents(text, base64Image, mimeType);

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MEDIUM,
      },
      temperature: 0.7,
      systemInstruction,
      responseMimeType: "application/json",
      responseJsonSchema: essayReviewSchema.toJSONSchema(),
    },
  });

  return response;
}

export async function generateFullEssayRewrite(
  instructions: string,
  taskType: AiPromptEssayType,
  originalEssay: string,
  base64Image?: string,
  mimeType?: string,
) {
  const text = getFullEssayRewritePrompt(
    taskType,
    !!(base64Image && mimeType),
    instructions,
    originalEssay,
  );

  const contents = getContents(text, base64Image, mimeType);

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MEDIUM,
      },
      temperature: 0.7,
      responseMimeType: "text/plain",
    },
  });

  return response;
}

function getContents(text: string, base64Image?: string, mimeType?: string) {
  return base64Image && mimeType
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
}
