import EssayType from "../types/essayType";

interface Option {
  label: string;
  value: EssayType;
}

const essayTypeOptions: Option[] = [
  {
    label: "General Task 1",
    value: "task-1G",
  },
  {
    label: "Academic Task 1",
    value: "task-1A",
  },
  {
    label: "Task 2",
    value: "task-2",
  },
];

export default essayTypeOptions;
