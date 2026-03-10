import React from "react";
import { Text } from "react-native";
import FormattedReport from "../../types/formattedReport";

interface ReportListProps {
  reports: FormattedReport[];
  currentReportIndex: number;
  listProperty:
    | "recurringStrengths"
    | "recurringWeaknesses"
    | "priorityRecommendations";
}

export default function ReportList({
  reports,
  currentReportIndex,
  listProperty,
}: ReportListProps) {
  return reports?.[currentReportIndex][listProperty].map((listPoint, index) =>
    listPoint ? (
      <Text key={index} className="text-typography-950 text-md">
        {listPoint}
      </Text>
    ) : (
      <></>
    ),
  );
}
