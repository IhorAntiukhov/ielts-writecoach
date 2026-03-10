import { generateFullEssayRewrite } from "@/src/api/gemini";
import { saveFullRewrite } from "@/src/api/reviewsRepo";
import EssayType from "@/src/types/essayType";
import formatAiPromptEssayType from "@/src/utils/formatAiPromptEssayType";

export default async function getFullRewrite(
  essayId: number,
  instructions: string,
  essayType: EssayType,
  originalEssay: string,
  base64Image?: string,
  mimeType?: string,
) {
  const response = await generateFullEssayRewrite(
    instructions,
    formatAiPromptEssayType(essayType),
    originalEssay,
    base64Image,
    mimeType,
  );

  const feedback = response.candidates?.[0].content?.parts?.[0].text;

  if (!feedback) throw Error("Failed to generate full Ai rewrite");

  await saveFullRewrite(essayId, feedback);
}
