import TimeIntervalType from "../types/timeInterval";

interface Option {
  label: string;
  value: TimeIntervalType;
}

const timeIntervalOptions: Option[] = [
  {
    label: "Last week",
    value: "7",
  },
  {
    label: "Last 2 weeks",
    value: "14",
  },
  {
    label: "Last month",
    value: "31",
  },
  {
    label: "Last 3 months",
    value: "91",
  },
  {
    label: "All time",
    value: "2147483647",
  },
];

export default timeIntervalOptions;
