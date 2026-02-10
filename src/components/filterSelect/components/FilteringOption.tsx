import {
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { clsx } from "clsx";
import {
  PrivateFilteringValue,
  PublicFilteringValue,
} from "../types/filteringValue";

interface FilteringOptionProps<
  T extends PrivateFilteringValue | PublicFilteringValue,
> {
  value: T;
  label: string;
  values: T[];
  setValues: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function FilteringOption<
  T extends PrivateFilteringValue | PublicFilteringValue,
>({ value, label, values, setValues }: FilteringOptionProps<T>) {
  const toggleValue = (value: T) => {
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
