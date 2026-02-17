import {
  FullPrivateEssay,
  FullPublicEssay,
} from "@/src/api/essaysRepo/types/fullEssayTypes";
import ReactionType from "@/src/types/reactionType";
import { useMemo } from "react";

type Reactions = (FullPrivateEssay | FullPublicEssay)["reactions"];

export default function useReactionCount(
  reactions: Reactions | undefined,
  reactionName: ReactionType,
) {
  return useMemo(
    () =>
      reactions?.reduce(
        (acc, val) => (val.reaction_type === reactionName ? acc + 1 : acc),
        0,
      ),
    [reactions, reactionName],
  );
}
