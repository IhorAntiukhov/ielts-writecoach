import { SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { getGlobalReports } from "@/src/api/globalReportRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AuthContext } from "@/src/context/AuthProvider";
import useToast from "@/src/hooks/useToast";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import CardBox from "@/src/ui/CardBox";
import IndicatorText from "@/src/ui/IndicatorText";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react-native";
import React, { use, useMemo, useState } from "react";
import { Text } from "react-native";
import getGlobalReport from "../../api/getGlobalReport";
import EssayAndAllType from "../../types/essayAndAllType";
import FormattedReport from "../../types/formattedReport";
import TimeIntervalType from "../../types/timeInterval";
import formatGlobalReport from "../../utils/formatGlobalReport";
import ReportList from "./ReportList";
import TimeIntervalChevronSelect from "./TimeIntervalChevronSelect";

cssInteropIcon(ChevronLeft);
cssInteropIcon(ChevronRight);

interface GlobalReportCardProps {
  timeInterval: TimeIntervalType;
  essayType: EssayAndAllType;
}

export default function GlobalReportCard({
  timeInterval,
  essayType,
}: GlobalReportCardProps) {
  const [currentReportIndex, setCurrentReportIndex] = useState(0);

  const { user } = use(AuthContext).session!;

  const queryClient = useQueryClient();

  const toast = useToast();

  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryKeyPrefixes.globalReport, user.id],
    queryFn: () => getGlobalReports(user.id),
  });

  const {
    mutate: getGlobalReportMutation,
    isPending: isGetGlobalReportMutationPending,
  } = useMutation({
    mutationFn: () => getGlobalReport(user.id!, timeInterval, essayType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryKeyPrefixes.globalReport,
      });
    },
    onError: (error) => {
      toast("error", "Failed to get global report", error?.message);
    },
  });

  const reports = useMemo(
    () =>
      data
        ? (data.map(({ report }) =>
            formatGlobalReport(report),
          ) as FormattedReport[])
        : undefined,
    [data],
  );

  return (
    <CardBox>
      <VStack space="2xl">
        <Text className="text-md text-typography-500">Global report</Text>

        {isPending ? (
          <SkeletonText _lines={3} className="h-2" />
        ) : isError ? (
          <IndicatorText isError>
            Failed to get global reports: {error?.message}
          </IndicatorText>
        ) : (
          <>
            {data && data.length > 0 ? (
              <>
                <TimeIntervalChevronSelect
                  data={data}
                  currentReportIndex={currentReportIndex}
                  setCurrentReportIndex={setCurrentReportIndex}
                />

                {reports?.[currentReportIndex] && (
                  <VStack space="xl">
                    <VStack space="md">
                      <Text className="text-xl text-typography-950 font-bold">
                        Recurring strengths
                      </Text>

                      <ReportList
                        reports={reports}
                        currentReportIndex={currentReportIndex}
                        listProperty="recurringStrengths"
                      />
                    </VStack>

                    <VStack space="md">
                      <Text className="text-xl text-typography-950 font-bold">
                        Recurring weaknesses
                      </Text>

                      <ReportList
                        reports={reports}
                        currentReportIndex={currentReportIndex}
                        listProperty="recurringWeaknesses"
                      />
                    </VStack>

                    <VStack space="md">
                      <Text className="text-xl text-typography-950 font-bold">
                        Most prominent weakness
                      </Text>

                      <Text className="text-typography-950 text-md">
                        {reports?.[currentReportIndex].mostProminentWeakness}
                      </Text>
                    </VStack>

                    <VStack space="md">
                      <Text className="text-xl text-typography-950 font-bold">
                        Priority recommendations
                      </Text>

                      <ReportList
                        reports={reports}
                        currentReportIndex={currentReportIndex}
                        listProperty="priorityRecommendations"
                      />
                    </VStack>
                  </VStack>
                )}
              </>
            ) : (
              <IndicatorText>
                You haven&apos;t generated any global reports yet
              </IndicatorText>
            )}

            <PrimaryButton
              icon={RefreshCcw}
              isLoading={isGetGlobalReportMutationPending}
              onPress={() => getGlobalReportMutation()}
            >
              Get global report
            </PrimaryButton>
          </>
        )}
      </VStack>
    </CardBox>
  );
}
