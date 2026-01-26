import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";

interface DropdownProps<T extends string> {
  selectedValue: T;
  onChange: (value: T) => void;
  options: {
    label: string;
    value: T;
  }[];
  initialLabel?: string;
  placeholder?: string;
}

export default function Dropdown<T extends string>({
  selectedValue,
  onChange,
  options,
  initialLabel,
  placeholder,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      initialLabel={initialLabel}
      selectedValue={selectedValue}
      onValueChange={(value) => onChange(value as T)}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <SelectTrigger
        variant="outline"
        size="md"
        className={clsx(
          "flex flex-row justify-between bg-background-50 rounded-lg",
          isOpen && "border-primary-700",
        )}
      >
        <SelectInput placeholder={placeholder} />
        <SelectIcon className="mr-3" as={isOpen ? ChevronUp : ChevronDown} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map(({ label, value }, index) => (
            <SelectItem key={index} label={label} value={value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
