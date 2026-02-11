import EssayType from "@/src/types/essayType";
import { Text } from "react-native";

interface EssayTitleProps {
  type: EssayType;
  instructions: string;
}

export default function EssayTitle({ type, instructions }: EssayTitleProps) {
  const essayType =
    type === "task-1A"
      ? "Academic Task 1"
      : type === "task-1G"
        ? "General Task 1"
        : "Task 2";

  return (
    <Text className="text-typography-950 text-lg">
      <Text className="font-bold">{`${essayType}: `}</Text>
      {instructions}
    </Text>
  );
}
