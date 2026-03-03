import { VStack } from "@/components/ui/vstack";
import { AnalyticsDataType } from "@/src/api/analyticsRepo/types/returnDataTypes";
import { reactionColors } from "@/src/constants/reactionColors";
import IndicatorText from "@/src/ui/IndicatorText";
import {
  DashPathEffect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { useMemo } from "react";
import { View } from "react-native";
import { Bar, CartesianChart } from "victory-native";
import useChartFont from "../../hooks/useChartFont";
import ReactionIndex from "../../types/reactionIndex";
import ChartLegend from "../legends/ChartLegend";
import BaseEssayMetricCard from "../shared/BaseEssayMetricCard";

interface ReactionTypesChartCardProps {
  data: AnalyticsDataType | undefined;
  isPending: boolean;
}

export default function ReactionCountsChartCard({
  data,
  isPending,
}: ReactionTypesChartCardProps) {
  const { font } = useChartFont();

  const chartData = useMemo(
    () =>
      data
        ?.find((analysis) => analysis?.type === "reactionCounts")
        ?.items.map(({ type, reaction_count }) => ({
          x:
            type === "Clear and Natural"
              ? 1
              : type === "Good Ideas"
                ? 2
                : type === "Well Structured"
                  ? 3
                  : type === "Language needs Work"
                    ? 4
                    : 5,
          reaction_count,
        }))
        .sort((a, b) => a.x - b.x),
    [data],
  );

  const yTickValues = useMemo(
    () =>
      chartData && chartData.length > 0
        ? Array.from(
            {
              length:
                chartData.sort((a, b) => b.reaction_count - a.reaction_count)[0]
                  .reaction_count + 2,
            },
            (_, i) => i,
          )
        : undefined,
    [chartData],
  );

  return (
    <BaseEssayMetricCard
      title="Reaction types"
      isPending={isPending}
      skeletonLines={3}
    >
      {chartData && chartData.length > 0 ? (
        <VStack space="lg">
          <View className="relative h-72">
            <CartesianChart
              data={chartData}
              xKey="x"
              yKeys={["reaction_count"]}
              xAxis={{
                tickValues: [1, 2, 3, 4, 5],
              }}
              yAxis={[
                {
                  font,
                  labelColor: "rgb(83, 82, 82)",
                  lineColor: "rgb(83, 82, 82)",
                  lineWidth: 1,
                  linePathEffect: <DashPathEffect intervals={[2, 4]} />,
                  tickValues: yTickValues,
                },
              ]}
              domainPadding={{
                top: 15,
                left: 50,
                right: 50,
              }}
            >
              {({ points, chartBounds }) =>
                points.reaction_count.map((point) => (
                  <Bar
                    key={point.xValue}
                    barCount={points.reaction_count.length}
                    chartBounds={chartBounds}
                    animate={{ type: "spring" }}
                    points={[point]}
                    roundedCorners={{
                      topLeft: 5,
                      topRight: 5,
                      bottomLeft: 5,
                      bottomRight: 5,
                    }}
                  >
                    <LinearGradient
                      start={vec(0, 0)}
                      end={vec(0, 600)}
                      colors={[
                        reactionColors[point.xValue as ReactionIndex],
                        `${reactionColors[point.xValue as ReactionIndex]}a50`,
                      ]}
                    />
                  </Bar>
                ))
              }
            </CartesianChart>
          </View>

          <ChartLegend chartType="Reaction types" />
        </VStack>
      ) : (
        <IndicatorText>No data</IndicatorText>
      )}
    </BaseEssayMetricCard>
  );
}
