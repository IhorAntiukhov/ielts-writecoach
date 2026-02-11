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
import { Pressable } from "react-native";
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
    <VStack space="2xl">
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
        <Image
          source={{ uri: data.image_url }}
          className="w-full rounded-lg border border-y border-outline-300"
          style={{
            aspectRatio:
              data.image_width && data.image_height
                ? data.image_width / data.image_height
                : 1920 / 1080,
          }}
          contentFit="contain"
        />
      )}
    </VStack>
  );
}
