import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { FullPublicEssay } from "@/src/api/essaysRepo/types/fullEssayTypes";

interface UserAvatarProps {
  profile: FullPublicEssay["profiles"];
}

export default function UserAvatar({ profile }: UserAvatarProps) {
  return (
    <Avatar size="md">
      <AvatarFallbackText>{profile.user_name}</AvatarFallbackText>
      <AvatarImage source={{ uri: profile.avatar_url! }} />
    </Avatar>
  );
}
