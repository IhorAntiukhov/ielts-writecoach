import { HStack } from "@/components/ui/hstack";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import reactionIcons from "@/src/constants/reactionIcons";
import { AuthContext } from "@/src/context/AuthProvider";
import useHandleReaction from "@/src/hooks/useHandleReaction";
import ReactionType from "@/src/types/reactionType";
import SkeletonCard from "@/src/ui/SkeletonCard";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { clsx } from "clsx";
import { Check } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { use, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import EssayDataContext from "../context/EssayDataContext";

cssInterop(ProgressFilledTrack, { className: "style" });
cssInteropIcon(Check);

interface ReactionCountProps {
  type: ReactionType;
  count: number;
  total: number;
  isPublicEssay: boolean;
}

export default function ReactionCount({
  type,
  count,
  total,
  isPublicEssay,
}: ReactionCountProps) {
  const { data } = use(EssayDataContext)!;
  const { user } = use(AuthContext).session!;

  const { handleEssayReactionMutation, isPending } = useHandleReaction(
    data!.id,
    true,
  );

  const reactions = data?.reactions;

  const isReactionSelected = useMemo(
    () =>
      reactions?.findIndex(
        ({ user_id, reaction_type }) =>
          user.id === user_id && reaction_type === type,
      ) !== -1,
    [reactions, type, user.id],
  );

  if (!data) return <SkeletonCard />;

  const handleEssayReaction = () => {
    if (!isPublicEssay) return;

    handleEssayReactionMutation(type);
  };

  return (
    <Pressable onPress={handleEssayReaction} disabled={isPending}>
      <VStack space="md">
        <HStack space="md" className="items-center justify-between">
          <HStack space="md" className="items-center">
            {reactionIcons[type]}
            <Text className="text-lg font-bold text-typography-950">
              {type}
            </Text>

            <View
              className={clsx(
                "rounded-full p-1",
                isReactionSelected
                  ? "bg-primary-500"
                  : "border-2 border-primary-500",
              )}
            >
              {isReactionSelected ? (
                <Check className="text-white" size={18} />
              ) : isPending ? (
                <Spinner className="text-white" size={14} />
              ) : (
                <View className="size-[14px]"></View>
              )}
            </View>
          </HStack>

          <Text className="text-lg font-bold text-typography-950">{count}</Text>
        </HStack>

        <Progress
          value={count * (100 / total)}
          size="sm"
          orientation="horizontal"
        >
          <ProgressFilledTrack
            className={
              type === "Clear and Natural"
                ? "text-green-600"
                : type === "Good Ideas"
                  ? "text-yellow-600"
                  : type === "Well Structured"
                    ? "text-blue-600"
                    : type === "Language needs Work"
                      ? "text-amber-600"
                      : "text-red-600"
            }
          />
        </Progress>
      </VStack>
    </Pressable>
  );
}
