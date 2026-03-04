import AiPromptEssayType from "@/src/types/aiPromptEssayType";
import EssayType from "@/src/types/essayType";

export default function getAiPromptEssayType(essayType: EssayType) {
  const taskType: AiPromptEssayType =
    essayType === "task-1A"
      ? "academic task 1"
      : essayType === "task-1G"
        ? "general writing task 1"
        : "task 2";

  return taskType;
}
