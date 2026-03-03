import Dropdown from "@/src/ui/Dropdown";
import essayAndAllTypeOptions from "../../constants/essayAndAllTypeOptions";
import EssayAndAllType from "../../types/essayAndAllType";

interface SelectEssayTypeProps {
  value: EssayAndAllType;
  onChange: (value: EssayAndAllType) => void;
}

export default function SelectEssayType({
  value,
  onChange,
}: SelectEssayTypeProps) {
  return (
    <Dropdown<EssayAndAllType>
      selectedValue={value}
      onChange={onChange}
      options={essayAndAllTypeOptions}
      initialLabel="All essays"
    />
  );
}
