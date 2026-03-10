import AiPromptEssayType from "../types/aiPromptEssayType";
import EssayType from "../types/essayType";

export default function formatAiPromptEssayType(
  essayType: EssayType,
): AiPromptEssayType {
  return essayType === "task-1A"
    ? "academic task 1"
    : essayType === "task-1G"
      ? "general writing task 1"
      : "task 2";
}
