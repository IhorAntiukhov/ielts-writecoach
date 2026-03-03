import { HStack } from "@/components/ui/hstack";
import ReactionIndex from "../../types/reactionIndex";
import EssayTypeLegend from "./EssayTypeLegend";
import LineLegend from "./LineLegend";
import ReactionBarLegend from "./ReactionBarLegend";

interface ChartLegendProps {
  chartType: "Band scores" | "Time to words" | "Reaction types" | "Essay types";
}

export default function ChartLegend({ chartType }: ChartLegendProps) {
  return (
    <HStack space="md" className="w-full items-start flex-wrap">
      {chartType === "Band scores" ? (
        <>
          <LineLegend category="Task Response" />

          <LineLegend category="Coherence" />

          <LineLegend category="Vocabulary" />

          <LineLegend category="Grammar" />
        </>
      ) : chartType === "Time to words" ? (
        <LineLegend category="Words per minute" />
      ) : chartType === "Reaction types" ? (
        Array.from({ length: 5 }, (_, i) => (
          <ReactionBarLegend key={i} reactionIndex={(i + 1) as ReactionIndex} />
        ))
      ) : (
        <>
          <EssayTypeLegend essayType="task-1A" />

          <EssayTypeLegend essayType="task-1G" />

          <EssayTypeLegend essayType="task-2" />
        </>
      )}
    </HStack>
  );
}
