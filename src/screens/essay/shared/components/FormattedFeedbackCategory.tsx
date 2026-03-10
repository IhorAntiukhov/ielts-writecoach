import { VStack } from "@/components/ui/vstack";
import formatJSON from "@/src/utils/formatJSON";
import { useMemo } from "react";
import { Text } from "react-native";
import FormattedFeedback from "../types/formattedFeedback";

interface FeedbackCategoryProps {
  feedback: string;
}

export default function FormattedFeedbackCategory({
  feedback,
}: FeedbackCategoryProps) {
  const formattedFeedback: FormattedFeedback = useMemo(
    () => formatJSON(feedback),
    [feedback],
  );

  return (
    <VStack space="lg">
      <VStack space="sm">
        <Text className="text-xl text-typography-950 font-bold">Strength</Text>

        <Text className="text-typography-950 text-md">
          {formattedFeedback?.strength}
        </Text>
      </VStack>

      <VStack space="sm">
        <Text className="text-xl text-typography-950 font-bold">Weakness</Text>

        <Text className="text-typography-950 text-md">
          {formattedFeedback?.weakness}
        </Text>
      </VStack>

      <VStack space="sm">
        <Text className="text-xl text-typography-950 font-bold">
          Improvement
        </Text>

        <Text className="text-typography-950 text-md">
          {formattedFeedback?.improvement}
        </Text>
      </VStack>
    </VStack>
  );
}
