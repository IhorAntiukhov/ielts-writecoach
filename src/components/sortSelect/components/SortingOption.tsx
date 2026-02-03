import { Button, ButtonText } from "@/components/ui/button";
import { clsx } from "clsx";
import SortingValue from "../types/sortingValue";

interface SortingOptionProps {
  value: SortingValue;
  setValue: React.Dispatch<React.SetStateAction<SortingValue>>;
  buttonValue: SortingValue;
  label: string;
}

export default function SortingOption({
  value,
  setValue,
  buttonValue,
  label,
}: SortingOptionProps) {
  const isSelected = value === buttonValue;

  const handlePress = () => {
    setValue(buttonValue);
  };

  return (
    <Button
      variant="outline"
      action="secondary"
      size="md"
      onPress={handlePress}
      className={clsx(
        "rounded-full data-[active=true]:border-secondary-500",
        isSelected && "bg-background-info",
      )}
    >
      <ButtonText
        className={clsx(
          isSelected ? "text-typography-950" : "text-typography-500",
        )}
      >
        {label}
      </ButtonText>
    </Button>
  );
}
