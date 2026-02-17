import { HStack } from "@/components/ui/hstack";
import {
  FullPrivateEssay,
  FullPublicEssay,
} from "@/src/api/essaysRepo/types/fullEssayTypes";
import PublishedDate from "@/src/components/publishedDate";
import useOpenUserProfile from "@/src/hooks/useOpenUserProfile";
import { Pressable, Text } from "react-native";
import UserAvatar from "../../shared/components/UserAvatar";

interface PublicEssayHeaderProps {
  type: "public";
  data: FullPublicEssay;
}

interface PrivateEssayHeaderProps {
  type: "private";
  data: FullPrivateEssay;
}

type EssayHeaderProps = PublicEssayHeaderProps | PrivateEssayHeaderProps;

export default function EssayHeader({ type, data }: EssayHeaderProps) {
  const { openUserProfile } = useOpenUserProfile(data.user_id);

  if (type === "private") return <PublishedDate createdAt={data.created_at!} />;

  const profile = data.profiles;

  return (
    <HStack space="md" className="items-center justify-between">
      <Pressable onPress={openUserProfile}>
        <HStack space="md" className="items-center">
          <UserAvatar profile={profile} />

          <Text className="text-typography-950 text-lg">
            {profile.user_name}
          </Text>
        </HStack>
      </Pressable>

      <PublishedDate createdAt={data.created_at!} />
    </HStack>
  );
}
