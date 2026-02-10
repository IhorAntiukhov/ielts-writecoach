export const publicFilteringOptions = [
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
  {
    label: "Not analyzed",
    value: "not-analyzed",
  },
] as const;

export const privateFilteringOptions = [
  ...publicFilteringOptions,
  {
    label: "Public",
    value: "public",
  },
] as const;
