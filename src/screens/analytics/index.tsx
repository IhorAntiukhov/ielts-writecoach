import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
  getUserEssayAnalytics,
  getUserEssayCounts,
  getUserReactionCounts,
} from "@/src/api/analyticsRepo";
import {
  GetUserEssayAnalyticsReturnType,
  GetUserEssayCountsReturnType,
  GetUserReactionCountsReturnType,
} from "@/src/api/analyticsRepo/types/returnDataTypes";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AuthContext } from "@/src/context/AuthProvider";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import Container from "@/src/ui/Container";
import DividerWithMargins from "@/src/ui/DividerWithMargins";
import IndicatorText from "@/src/ui/IndicatorText";
import {
  useQueries,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react-native";
import { use, useCallback, useMemo, useState } from "react";
import { Platform, View } from "react-native";
import AllEssayCountCard from "./components/charts/AllEssayCountCard";
import EssayTypesChartCard from "./components/charts/EssayTypesChartCard";
import LineChartCard from "./components/charts/LineChartCard";
import ReactionCountsChartCard from "./components/charts/ReactionCountsChartCard";
import GlobalReportCard from "./components/globalReport/GlobalReportCard";
import SelectEssayType from "./components/selects/SelectEssayType";
import SelectTimeInterval from "./components/selects/SelectTimeInterval";
import EssayAndAllType from "./types/essayAndAllType";
import TimeIntervalType from "./types/timeInterval";

export default function AnalyticsScreen() {
  const [timeInterval, setTimeInterval] = useState<TimeIntervalType>("7");
  const [essayType, setEssayType] = useState<EssayAndAllType>("all");

  const { user } = use(AuthContext).session!;

  const queryClient = useQueryClient();

  const combine = useCallback(
    (
      results: (
        | UseQueryResult<GetUserEssayCountsReturnType, Error>
        | UseQueryResult<GetUserEssayAnalyticsReturnType, Error>
        | UseQueryResult<GetUserReactionCountsReturnType, Error>
      )[],
    ) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
        errors: results
          .filter((result) => !!result.error)
          .map((result) => result.error.message),
      };
    },
    [],
  );

  const queries = useMemo(
    () => [
      {
        queryKey: [
          queryKeyPrefixes.analytics.essayCounts,
          user.id,
          timeInterval,
        ],
        queryFn: () => getUserEssayCounts(user.id, timeInterval),
      },
      {
        queryKey: [
          queryKeyPrefixes.analytics.userAnalytics,
          user.id,
          timeInterval,
          essayType,
        ],
        queryFn: () => getUserEssayAnalytics(user.id, timeInterval, essayType),
      },
      {
        queryKey: [
          queryKeyPrefixes.analytics.reactionCounts,
          user.id,
          timeInterval,
          essayType,
        ],
        queryFn: () => getUserReactionCounts(user.id, timeInterval, essayType),
      },
    ],
    [timeInterval, user.id, essayType],
  );

  const { data, errors, isPending, isError } = useQueries({
    queries,
    combine,
  });

  const refreshData = () => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) =>
        queryKey[0] === queryKeyPrefixes.analytics.essayCounts ||
        queryKey[0] === queryKeyPrefixes.analytics.userAnalytics ||
        queryKey[0] === queryKeyPrefixes.analytics.reactionCounts,
    });
  };

  return (
    <Container topAlignment>
      <VStack space="2xl" className="w-full max-w-[600px]">
        <HStack space="md">
          <View className="flex-1">
            <SelectTimeInterval
              value={timeInterval}
              onChange={setTimeInterval}
            />
          </View>

          <View className="flex-1">
            <SelectEssayType value={essayType} onChange={setEssayType} />
          </View>
        </HStack>

        {isError ? (
          <IndicatorText isError>
            Failed to get analytics: {errors?.join("\n")}
          </IndicatorText>
        ) : (
          <>
            <GlobalReportCard
              timeInterval={timeInterval}
              essayType={essayType}
            />

            <DividerWithMargins notInCard />

            <AllEssayCountCard
              data={data}
              isPending={isPending}
              essayType={essayType}
            />

            {Platform.OS === "web" ? (
              <IndicatorText>
                Download the Android app to access charts
              </IndicatorText>
            ) : (
              <>
                <LineChartCard
                  title="Band scores"
                  data={data}
                  isPending={isPending}
                />
                <LineChartCard
                  title="Time to words"
                  data={data}
                  isPending={isPending}
                />
                <ReactionCountsChartCard data={data} isPending={isPending} />
                <EssayTypesChartCard data={data} isPending={isPending} />
              </>
            )}
          </>
        )}

        <SecondaryButton
          icon={RefreshCcw}
          onPress={() => {
            refreshData();
          }}
        >
          Refresh analytics
        </SecondaryButton>
      </VStack>
    </Container>
  );
}
