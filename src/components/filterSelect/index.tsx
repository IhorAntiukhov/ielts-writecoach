import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { VStack } from "@/components/ui/vstack";
import EssayFeedContext from "@/src/components/essayFeed/context/EssayFeedContext";
import IconButton from "@/src/ui/button/IconButton";
import IndicatorText from "@/src/ui/IndicatorText";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { FunnelPlus, FunnelX } from "lucide-react-native";
import { use, useState } from "react";
import FilteringOption from "./components/FilteringOption";
import {
  privateFilteringOptions,
  publicFilteringOptions,
} from "./constants/filteringOptions";

cssInteropIcon(FunnelPlus);
cssInteropIcon(FunnelX);

export default function FilterSelect() {
  const { type, filteringCriteria, setFilteringCriteria } =
    use(EssayFeedContext)!;
  const [isOpen, setIsOpen] = useState(false);

  const Icon = filteringCriteria.length ? FunnelX : FunnelPlus;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        variant="outline"
        action="secondary"
        className="px-2.5 py-2.5 data-[active=true]:border-secondary-500"
        onPress={handleOpen}
      >
        <Icon className="text-typography-950" />
      </IconButton>
      <Actionsheet isOpen={isOpen} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full p-4" space="md">
            <IndicatorText>Filtering options</IndicatorText>
            {type === "private"
              ? privateFilteringOptions.map(({ value, label }, index) => (
                  <FilteringOption
                    key={index}
                    value={value}
                    label={label}
                    values={filteringCriteria}
                    setValues={setFilteringCriteria}
                  />
                ))
              : publicFilteringOptions.map(({ value, label }, index) => (
                  <FilteringOption
                    key={index}
                    value={value}
                    label={label}
                    values={filteringCriteria}
                    setValues={setFilteringCriteria}
                  />
                ))}
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
