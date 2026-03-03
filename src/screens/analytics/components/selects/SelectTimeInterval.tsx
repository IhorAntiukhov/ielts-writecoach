import Dropdown from "@/src/ui/Dropdown";
import timeIntervalOptions from "../../constants/timeIntervalOptions";
import TimeIntervalType from "../../types/timeInterval";

interface SelectTimeIntervalProps {
  value: TimeIntervalType;
  onChange: (value: TimeIntervalType) => void;
}

export default function SelectTimeInterval({
  value,
  onChange,
}: SelectTimeIntervalProps) {
  return (
    <Dropdown<TimeIntervalType>
      selectedValue={value}
      onChange={onChange}
      options={timeIntervalOptions}
      initialLabel="Last week"
    />
  );
}
