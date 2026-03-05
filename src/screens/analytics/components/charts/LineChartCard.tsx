import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { AnalyticsDataType } from "@/src/api/analyticsRepo/types/returnDataTypes";
import IndicatorText from "@/src/ui/IndicatorText";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { DashPathEffect } from "@shopify/react-native-skia";
import { CircleQuestionMark } from "lucide-react-native";
import React, { useMemo } from "react";
import { NonUndefined } from "react-hook-form";
import { Text, View } from "react-native";
import { CartesianChart, Line, useChartTransformState } from "victory-native";
import useChartFont from "../../hooks/useChartFont";
import ChartLegend from "../legends/ChartLegend";
import BaseEssayMetricCard from "../shared/BaseEssayMetricCard";
import ChartZoomPanel from "./ChartZoomPanel";

cssInteropIcon(CircleQuestionMark);

interface LineChartCardProps {
  title: "Band scores" | "Time to words";
  data: AnalyticsDataType | undefined;
  isPending: boolean;
}

export default function LineChartCard({
  title,
  data,
  isPending,
}: LineChartCardProps) {
  const isBandScoresChart = title === "Band scores";

  const { font } = useChartFont();

  const { state: transformState } = useChartTransformState({
    scaleX: 1.0,
    scaleY: 1.0,
  });

  const chartData = useMemo(
    () =>
      data
        ?.find((result) => result?.type === "userAnalytics")
        ?.items.filter((review) => review.task_response_band !== null)
        .map((review) => ({
          ...review,
          created_at: new Date(review.created_at).getTime(),
        })),
    [data],
  );

  const yKeys: (keyof NonUndefined<typeof chartData>[number])[] = useMemo(
    () =>
      isBandScoresChart
        ? [
            "task_response_band",
            "coherence_band",
            "vocabulary_band",
            "grammar_band",
          ]
        : ["words_to_time_ratio"],
    [isBandScoresChart],
  );

  const tickValues = useMemo(
    () => chartData?.map((item) => item.created_at),
    [chartData],
  );

  const domain: [number, number] | undefined = useMemo(() => {
    if (!chartData || chartData.length === 0 || isBandScoresChart)
      return undefined;

    const sortedChartData = chartData.sort(
      (a, b) => a.words_to_time_ratio - b.words_to_time_ratio,
    );

    return [
      0,
      sortedChartData[sortedChartData.length - 1].words_to_time_ratio + 5,
    ];
  }, [chartData, isBandScoresChart]);

  const sharedLineProps: Partial<React.ComponentPropsWithoutRef<typeof Line>> =
    {
      strokeWidth: 3,
      animate: { type: "spring", duration: 300 },
      strokeJoin: "round",
      strokeCap: "round",
    };

  return (
    <BaseEssayMetricCard title={title} isPending={isPending} skeletonLines={3}>
      {chartData && chartData.length > 0 ? (
        <VStack space={isBandScoresChart ? "lg" : "2xl"}>
          <VStack space="md">
            <View className="h-72">
              <CartesianChart
                data={chartData}
                xKey="created_at"
                yKeys={yKeys}
                xAxis={{
                  font,
                  labelColor: "rgb(83, 82, 82)",
                  formatXLabel: (label) =>
                    label
                      ? new Date(label).toLocaleDateString("en-GB", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "",
                  tickValues,
                  enableRescaling: true,
                }}
                yAxis={[
                  {
                    font,
                    labelColor: "rgb(83, 82, 82)",
                    lineColor: "rgb(83, 82, 82)",
                    lineWidth: 1,
                    linePathEffect: <DashPathEffect intervals={[2, 4]} />,
                    formatYLabel: (label) =>
                      isBandScoresChart
                        ? label.toString().padEnd(3, ".0")
                        : `${label} w/m`,
                    tickCount: 5,
                    tickValues: isBandScoresChart ? [1, 3, 5, 7, 9] : undefined,
                    domain: isBandScoresChart ? [1, 9] : domain,
                  },
                ]}
                domainPadding={{
                  left: 20,
                  right: 20,
                  top: 15,
                  bottom: 15,
                }}
                transformState={transformState}
                transformConfig={{
                  pan: {
                    enabled: true,
                    dimensions: "x",
                  },
                  pinch: {
                    enabled: true,
                    dimensions: "x",
                  },
                }}
              >
                {({ points }) =>
                  isBandScoresChart ? (
                    <>
                      <Line
                        points={points.task_response_band}
                        color="red"
                        {...sharedLineProps}
                      />

                      <Line
                        points={points.coherence_band}
                        color="blue"
                        {...sharedLineProps}
                      />

                      <Line
                        points={points.vocabulary_band}
                        color="green"
                        {...sharedLineProps}
                      />

                      <Line
                        points={points.grammar_band}
                        color="purple"
                        {...sharedLineProps}
                      />
                    </>
                  ) : (
                    <Line
                      points={points.words_to_time_ratio}
                      color="orange"
                      {...sharedLineProps}
                    />
                  )
                }
              </CartesianChart>
            </View>

            <ChartZoomPanel transformState={transformState} />
          </VStack>

          <ChartLegend chartType={title} />

          {!isBandScoresChart && (
            <VStack space="md">
              <HStack space="sm" className="items-center">
                <CircleQuestionMark className="text-typography-500" />
                <Text className="text-typography-500">Recommended pace:</Text>
              </HStack>

              <VStack space="sm">
                <Text className="text-typography-500">
                  Task 1 - 7.5 words per minute
                </Text>
                <Text className="text-typography-500">
                  Task 2 - 6.25 words per minute
                </Text>
              </VStack>
            </VStack>
          )}
        </VStack>
      ) : (
        <IndicatorText>No data</IndicatorText>
      )}
    </BaseEssayMetricCard>
  );
}
