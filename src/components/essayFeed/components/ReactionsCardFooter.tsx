import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
  PrivateFeedEssay,
  PublicFeedEssay,
} from "@/src/api/essaysRepo/types/feedEssayTypes";
import reactionIcons from "@/src/constants/reactionIcons";
import { AuthContext } from "@/src/context/AuthProvider";
import useHandleReaction from "@/src/hooks/useHandleReaction";
import useOpenEssay from "@/src/hooks/useOpenEssay";
import { EssayNavigationContext } from "@/src/screens/essay/shared/context/EssayNavigationProvider";
import ReactionType from "@/src/types/reactionType";
import MenuButton from "@/src/ui/button/MenuButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { getNounByNumber } from "@/src/utils/getNounByNumber";
import { Award, MessageCircle } from "lucide-react-native";
import { use, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";

cssInteropIcon(Award);
cssInteropIcon(MessageCircle);

const menuOptions = Object.entries(reactionIcons).map(([key, icon]) => ({
  icon,
  value: key as ReactionType,
  label: key,
}));

interface ReactionsCardFooterProps {
  data: PublicFeedEssay | PrivateFeedEssay;
}

export default function ReactionsCardFooter({
  data,
}: ReactionsCardFooterProps) {
  const [commentsCountHeight, setCommentsCountHeight] = useState<
    number | undefined
  >();

  const { user } = use(AuthContext).session!;
  const { setNavigationIntent } = use(EssayNavigationContext);

  const { openEssay } = useOpenEssay(false, data.id!, data.user_id!);

  const { handleEssayReactionMutation, isPending } = useHandleReaction(
    data.id!,
    false,
  );

  const handleReactionsCountLayout = (event: LayoutChangeEvent) => {
    setCommentsCountHeight(event.nativeEvent.layout.height);
  };

  const handleOpenComments = () => {
    setNavigationIntent?.("comment");
    openEssay();
  };

  return (
    <HStack space="md" className="items-center justify-between flex-1">
      <VStack space="lg" className="items-center">
        <HStack
          space="md"
          className="items-center"
          onLayout={data.top_reaction ? handleReactionsCountLayout : undefined}
        >
          <View className="p-1.5 bg-background-50 rounded-full">
            {data.top_reaction && reactionIcons[data.top_reaction]}
          </View>

          <Text className="text-typography-700 text-md">
            {data.reactions_count}{" "}
            {getNounByNumber(data.reactions_count!, "reaction")}
          </Text>
        </HStack>

        {data.user_id !== user.id && (
          <MenuButton<ReactionType>
            onChange={(value) =>
              !isPending && handleEssayReactionMutation(value)
            }
            trigger={
              <HStack space="sm" className="items-center justify-center">
                <Award className="text-primary-500" size={22} />

                <Text className="text-primary-500 text-md font-bold">Like</Text>
              </HStack>
            }
            options={menuOptions}
          />
        )}
      </VStack>

      {data.user_id !== user.id && (
        <Divider orientation="vertical" className="self-stretch" />
      )}

      <VStack space="lg" className="items-center">
        <Text
          className="text-typography-700 text-md align-middle"
          style={{
            height: data.top_reaction ? commentsCountHeight : undefined,
          }}
        >
          {data.comments_count}{" "}
          {getNounByNumber(data.comments_count!, "comment")}
        </Text>

        {data.user_id !== user.id && (
          <Pressable onPress={handleOpenComments}>
            <HStack space="sm" className="items-center justify-center">
              <MessageCircle className="text-primary-500" size={22} />

              <Text className="text-primary-500 text-md font-bold">
                Comment
              </Text>
            </HStack>
          </Pressable>
        )}
      </VStack>
    </HStack>
  );
}
