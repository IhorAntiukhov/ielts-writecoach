import {
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { clsx } from "clsx";
import FilteringValue from "../types/filteringValue";

interface FilteringOptionProps {
  value: FilteringValue;
  label: string;
  values: FilteringValue[];
  setValues: React.Dispatch<React.SetStateAction<FilteringValue[]>>;
}

export default function FilteringOption({
  value,
  label,
  values,
  setValues,
}: FilteringOptionProps) {
  const toggleValue = (value: FilteringValue) => {
    const valueIndex = values.indexOf(value);
    if (valueIndex === -1) {
      setValues((values) => [...values, value]);
    } else {
      setValues((values) => values.toSpliced(valueIndex, 1));
    }
  };

  return (
    <ActionsheetItem
      onPress={() => toggleValue(value)}
      className={clsx(
        "rounded-md",
        values.includes(value) && "bg-background-info",
      )}
    >
      <ActionsheetItemText className="text-md">{label}</ActionsheetItemText>
    </ActionsheetItem>
  );
}
