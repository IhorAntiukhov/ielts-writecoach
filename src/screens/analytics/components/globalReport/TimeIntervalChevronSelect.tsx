import { HStack } from "@/components/ui/hstack";
import { GlobalReport } from "@/src/api/globalReportRepo";
import IconButton from "@/src/ui/button/IconButton";
import formatDate from "@/src/utils/formatDate";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Text } from "react-native";

interface SelectTimeIntervalProps {
  data: GlobalReport[];
  currentReportIndex: number;
  setCurrentReportIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimeIntervalChevronSelect({
  data,
  currentReportIndex,
  setCurrentReportIndex,
}: SelectTimeIntervalProps) {
  const goToPreviousInterval = () => {
    setCurrentReportIndex((value) => value + 1);
  };

  const goToNextInterval = () => {
    setCurrentReportIndex((value) => value - 1);
  };

  const startDate = data[currentReportIndex].start_date;
  const endDate = data[currentReportIndex].end_date;

  const intervalText = `${new Date(startDate).getTime() === 0 ? "Before " : `${formatDate(startDate)} - `}${formatDate(endDate)}`;

  return (
    <HStack space="md" className="items-center justify-between">
      <Text className="text-typography-700 text-md">{intervalText}</Text>

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
  );
}
