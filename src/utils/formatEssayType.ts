import EssayType from "../types/essayType";

export default function formatEssayType(type: EssayType) {
  return type === "task-1A"
    ? "Academic Task 1"
    : type === "task-1G"
      ? "General Task 1"
      : "Task 2";
}
