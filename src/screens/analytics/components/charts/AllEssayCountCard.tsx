import { AnalyticsDataType } from "@/src/api/analyticsRepo/types/returnDataTypes";
import { Text } from "react-native";
import EssayAndAllType from "../../types/essayAndAllType";
import BaseEssayMetricCard from "../shared/BaseEssayMetricCard";

interface AllEssayCountCardProps {
  data: AnalyticsDataType | undefined;
  isPending: boolean;
  essayType: EssayAndAllType;
}

export default function AllEssayCountCard({
  data,
  isPending,
  essayType,
}: AllEssayCountCardProps) {
  return (
    <BaseEssayMetricCard
      title="All essays"
      isPending={isPending}
      skeletonLines={1}
    >
      <Text className="text-2xl font-bold text-typography-950">
        {data
          ?.find((result) => result?.type === "essayCounts")
          ?.items.reduce(
            (acc, prev) =>
              essayType === "all" || prev.type === essayType
                ? acc + prev.essay_count
                : acc,
            0,
          )}
      </Text>
    </BaseEssayMetricCard>
  );
}
