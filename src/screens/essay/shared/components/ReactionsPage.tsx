import { VStack } from "@/components/ui/vstack";
import { AuthContext } from "@/src/context/AuthProvider";
import CardBox from "@/src/ui/CardBox";
import IndicatorText from "@/src/ui/IndicatorText";
import SkeletonCard from "@/src/ui/SkeletonCard";
import { use, useEffect, useState } from "react";
import EssayDataContext from "../context/EssayDataContext";
import { EssayNavigationContext } from "../context/EssayNavigationProvider";
import useReactionCount from "../hooks/useReactionCount";
import CommentsModal from "./CommentsModal";
import ReactionCount from "./ReactionCount";

export default function ReactionsPage() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { data, isPending } = use(EssayDataContext)!;
  const { user } = use(AuthContext).session!;
  const { navigationIntent, setNavigationIntent } = use(
    EssayNavigationContext,
  )!;

  const isPublicEssay = user.id !== data?.user_id;

  const reactions = data?.reactions;

  useEffect(() => {
    if (navigationIntent === "comment") {
      setNavigationIntent?.(null);
      setIsModalOpened(true);
    }
  }, [navigationIntent, setNavigationIntent]);

  const clearAndNaturalReactions = useReactionCount(
    reactions,
    "Clear and Natural",
  );
  const goodIdeasReactions = useReactionCount(reactions, "Good Ideas");
  const wellStructuredReactions = useReactionCount(
    reactions,
    "Well Structured",
  );
  const languageNeedsWorkReactions = useReactionCount(
    reactions,
    "Language needs Work",
  );
  const hardToFollowReactions = useReactionCount(reactions, "Hard to Follow");

  return (
    <VStack space="2xl">
      {isPending ? (
        <SkeletonCard />
      ) : !data ? (
        <IndicatorText>
          You have to save your essay to access reactions
        </IndicatorText>
      ) : (
        <>
          <CardBox>
            <VStack space="2xl">
              <ReactionCount
                type="Clear and Natural"
                count={clearAndNaturalReactions!}
                total={reactions?.length!}
                isPublicEssay={isPublicEssay}
              />

              <ReactionCount
                type="Good Ideas"
                count={goodIdeasReactions!}
                total={reactions?.length!}
                isPublicEssay={isPublicEssay}
              />

              <ReactionCount
                type="Well Structured"
                count={wellStructuredReactions!}
                total={reactions?.length!}
                isPublicEssay={isPublicEssay}
              />

              <ReactionCount
                type="Language needs Work"
                count={languageNeedsWorkReactions!}
                total={reactions?.length!}
                isPublicEssay={isPublicEssay}
              />

              <ReactionCount
                type="Hard to Follow"
                count={hardToFollowReactions!}
                total={reactions?.length!}
                isPublicEssay={isPublicEssay}
              />
            </VStack>
          </CardBox>

          <CommentsModal
            isOpened={isModalOpened}
            setIsOpened={setIsModalOpened}
          />
        </>
      )}
    </VStack>
  );
}
