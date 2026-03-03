import { HStack } from "@/components/ui/hstack";
import { SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { getGlobalReports } from "@/src/api/globalReportRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AuthContext } from "@/src/context/AuthProvider";
import IconButton from "@/src/ui/button/IconButton";
import CardBox from "@/src/ui/CardBox";
import IndicatorText from "@/src/ui/IndicatorText";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import formatDate from "@/src/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { use, useState } from "react";
import { Text } from "react-native";

cssInteropIcon(ChevronLeft);
cssInteropIcon(ChevronRight);

export default function GlobalReportCard() {
  const { user } = use(AuthContext).session!;
  const [currentReportIndex, setCurrentReportIndex] = useState(0);

  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryKeyPrefixes, user.id],
    queryFn: () => getGlobalReports(user.id),
  });

  const goToPreviousInterval = () => {
    setCurrentReportIndex((value) => value + 1);
  };

  const goToNextInterval = () => {
    setCurrentReportIndex((value) => value - 1);
  };

  return (
    <CardBox>
      <VStack space="lg">
        <Text className="text-md text-typography-500">Global report</Text>

        {isPending ? (
          <SkeletonText _lines={3} className="h-2" />
        ) : isError ? (
          <IndicatorText isError>
            Failed to get global reports: {error?.message}
          </IndicatorText>
        ) : (
          <>
            {data && (
              <VStack space="lg">
                <HStack space="md" className="justify-between">
                  <Text>
                    {formatDate(data[currentReportIndex].end_date)} -{" "}
                    {formatDate(data[currentReportIndex].start_date)}
                  </Text>

                  <HStack space="md">
                    <IconButton
                      action="secondary"
                      className="bg-transparent px-1 py-1"
                      disabled={currentReportIndex === data.length - 1}
                      onPress={goToPreviousInterval}
                    >
                      <ChevronLeft
                        className={clsx(
                          currentReportIndex === data.length - 1
                            ? "text-typography-500"
                            : "text-typography-950",
                        )}
                      />
                    </IconButton>

                    <IconButton
                      action="secondary"
                      className="bg-transparent px-1 py-1"
                      disabled={currentReportIndex === 0}
                      onPress={goToNextInterval}
                    >
                      <ChevronRight
                        className={clsx(
                          currentReportIndex === 0
                            ? "text-typography-500"
                            : "text-typography-950",
                        )}
                      />
                    </IconButton>
                  </HStack>
                </HStack>

                <Text className="text-typography-950 text-md">
                  {data[currentReportIndex].report}
                </Text>
              </VStack>
            )}
          </>
        )}
      </VStack>
    </CardBox>
  );
}
