import essayTypeOptions from "@/src/constants/essayTypeOptions";
import EssayAndAllType from "../types/essayAndAllType";

interface Option {
  label: string;
  value: EssayAndAllType;
}

const essayAndAllTypeOptions: Option[] = [
  ...essayTypeOptions,
  {
    label: "All essays",
    value: "all",
  },
];

export default essayAndAllTypeOptions;
