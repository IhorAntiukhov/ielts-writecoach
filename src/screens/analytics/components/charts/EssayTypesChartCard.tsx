import { VStack } from "@/components/ui/vstack";
import { AnalyticsDataType } from "@/src/api/analyticsRepo/types/returnDataTypes";
import IndicatorText from "@/src/ui/IndicatorText";
import formatEssayType from "@/src/utils/formatEssayType";
import { cssInterop } from "nativewind";
import React, { useMemo } from "react";
import { Pie, PolarChart } from "victory-native";
import essayTypeColors from "../../constants/essayTypeColors";
import useChartFont from "../../hooks/useChartFont";
import ChartLegend from "../legends/ChartLegend";
import BaseEssayMetricCard from "../shared/BaseEssayMetricCard";

cssInterop(PolarChart, {
  containerClassName: {
    target: "containerStyle",
  },
});

interface EssayTypesChartCardProps {
  data: AnalyticsDataType;
  isPending: boolean;
}

export default function EssayTypesChartCard({
  data,
  isPending,
}: EssayTypesChartCardProps) {
  const { font } = useChartFont(24);

  const chartData = useMemo(
    () =>
      data
        ?.find((analysis) => analysis?.type === "essayCounts")
        ?.items.map(({ type, essay_count }) => ({
          type: formatEssayType(type),
          essay_count,
          color: essayTypeColors[type],
        })),
    [data],
  );

  return (
    <BaseEssayMetricCard
      title="Essay types"
      isPending={isPending}
      skeletonLines={3}
    >
      {chartData && chartData.length ? (
        <VStack space="lg">
          <PolarChart
            data={chartData}
            labelKey={"type"}
            valueKey={"essay_count"}
            colorKey={"color"}
            // @ts-ignore
            containerClassName="self-center max-w-56 max-h-56 aspect-square"
          >
            <Pie.Chart>
              {({ slice }) => (
                <Pie.Slice>
                  <Pie.Label
                    font={font}
                    radiusOffset={0.5}
                    text={slice.value.toString()}
                  />
                </Pie.Slice>
              )}
            </Pie.Chart>
          </PolarChart>

          <ChartLegend chartType="Essay types" />
        </VStack>
      ) : (
        <IndicatorText>No data</IndicatorText>
      )}
    </BaseEssayMetricCard>
  );
}
