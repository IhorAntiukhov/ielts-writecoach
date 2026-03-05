import FeedbackAvailabilityType from "@/src/types/feedbackAvailabilityType";

interface Option {
  label: string;
  value: FeedbackAvailabilityType;
}

const feedbackAvailabilityOptions: Option[] = [
  {
    label: "No feedback",
    value: "no-feedback",
  },
  {
    label: "Reactions only",
    value: "reactions-only",
  },
  {
    label: "Reactions and comments",
    value: "reactions-and-comments",
  },
];

export default feedbackAvailabilityOptions;
