import { VStack } from "@/components/ui/vstack";
import {
  PrivateFeedEssay,
  PublicFeedEssay,
} from "@/src/api/essaysRepo/types/feedEssayTypes";
import { FullPublicEssay } from "@/src/api/essaysRepo/types/fullEssayTypes";
import useOpenEssay from "@/src/hooks/useOpenEssay";
import PrivacyType from "@/src/types/privacyType";
import SmallCardBox from "@/src/ui/SmallCardBox";
import { Image } from "expo-image";
import { Platform, Pressable, View } from "react-native";
import EssayTitle from "./EssayTitle";

interface EssayInstructionsProps {
  type: PrivacyType;
  data: FullPublicEssay | PublicFeedEssay | PrivateFeedEssay;
  isFullPublicEssay?: boolean;
}

export default function EssayInstructions({
  type,
  data,
  isFullPublicEssay,
}: EssayInstructionsProps) {
  const { openEssay } = useOpenEssay(
    type === "private",
    data.id!,
    data.user_id!,
  );

  return (
    <VStack space="2xl" className="w-full">
      <Pressable onPress={openEssay}>
        {isFullPublicEssay ? (
          <SmallCardBox className="items-stretch justify-stretch px-3 py-2">
            <EssayTitle type={data.type!} instructions={data.instructions!} />
          </SmallCardBox>
        ) : (
          <EssayTitle type={data.type!} instructions={data.instructions!} />
        )}
      </Pressable>

      {data.image_url && (
        <View
          style={{
            width: "100%",
            aspectRatio:
              data.image_width && data.image_height
                ? data.image_width / data.image_height
                : 1920 / 1080,
          }}
        >
          <Image
            source={{ uri: data.image_url }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: Platform.OS !== "web" ? 8 : undefined,
            }}
            className="w-full h-full rounded-lg border border-y border-outline-300"
            contentFit="contain"
            alt="Task 1 instructions image"
            priority="high"
          />
        </View>
      )}
    </VStack>
  );
}
