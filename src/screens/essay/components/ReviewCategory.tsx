import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import CardBox from "@/src/ui/CardBox";
import { clsx } from "clsx";
import { cssInterop } from "nativewind";
import { Text, View } from "react-native";
import formatFeedback from "../utils/formatFeedback";

interface ReviewCategoryProps {
  title: string;
  isLoading: boolean;
  bandScore?: number;
  detailedFeedback?: string;
}

cssInterop(ProgressFilledTrack, { className: "style" });

export default function ReviewCategory({
  title,
  isLoading,
  bandScore,
  detailedFeedback,
}: ReviewCategoryProps) {
  if (isLoading || !bandScore)
    return (
      <View className="w-full max-w-[600px] px-8 py-6 bg-background-100 rounded-lg">
        <SkeletonText _lines={3} className="h-2" />
      </View>
    );

  return (
    <CardBox>
      <VStack space="2xl">
        <VStack space="lg">
          <HStack space="md" className="items-center justify-between">
            <Text className="text-xl font-bold text-typography-950">
              {title}
            </Text>

            <Text
              className={clsx(
                "text-xl font-bold",
                bandScore <= 4
                  ? "text-red-600"
                  : bandScore > 4 && bandScore <= 5
                    ? "text-orange-600"
                    : bandScore > 5 && bandScore <= 6.5
                      ? "text-yellow-600"
                      : bandScore > 6.5 && bandScore <= 8
                        ? "text-blue-600"
                        : "text-green-600",
              )}
            >
              {bandScore.toString().padEnd(3, ".0")}
            </Text>
          </HStack>

          <Progress
            value={bandScore * (100 / 9)}
            size="md"
            orientation="horizontal"
          >
            <ProgressFilledTrack
              className={
                bandScore <= 4
                  ? "bg-red-600"
                  : bandScore > 4 && bandScore <= 5
                    ? "bg-orange-600"
                    : bandScore > 5 && bandScore <= 6.5
                      ? "bg-yellow-600"
                      : bandScore > 6.5 && bandScore <= 8
                        ? "bg-blue-600"
                        : "bg-green-600"
              }
            />
          </Progress>
        </VStack>

        <View className="-mx-8">
          <Divider />
        </View>

        <Text className="text-md text-typography-950">
          {detailedFeedback ? formatFeedback(detailedFeedback) : ""}
        </Text>
      </VStack>
    </CardBox>
  );
}
