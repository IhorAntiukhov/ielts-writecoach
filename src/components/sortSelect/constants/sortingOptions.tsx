const sortingOptions = [
  {
    value: "created_at",
    label: "Recent",
  },
  {
    value: "average_band_score",
    label: "Best band",
  },
  {
    value: "reactions_count",
    label: "Popular",
  },
] as const;

export default sortingOptions;
