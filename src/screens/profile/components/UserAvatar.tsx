import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { AuthContext } from "@/src/context/AuthProvider";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { useMutation } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react-native";
import { use, useState } from "react";
import { View } from "react-native";
import uploadAvatar from "../api/uploadAvatar";

const Icon = cssInteropIcon(ImagePlus);

export default function UserAvatar() {
  const { user } = use(AuthContext).session!;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const toast = useToast();

  const { mutate: uploadAvatarMutation, isPending } = useMutation({
    mutationFn: (userId: string) => uploadAvatar(userId),
    onSuccess(data) {
      setAvatarUrl(data);
    },
    onError: (error) => {
      toast("error", "Upload avatar", error.message);
    },
  });

  return (
    <Avatar
      size="xl"
      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 elevation-md"
    >
      {isPending && (
        <View className="flex items-center justify-center absolute w-full h-full rounded-full bg-black/50">
          <Spinner size={64} className="text-typography-950" />
        </View>
      )}

      <AvatarFallbackText>{user.user_metadata.name}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: `${avatarUrl || user.user_metadata.avatar_url}?v=${user.user_metadata.avatar_timestamp}`,
        }}
      />
      {!isPending && (
        <IconButton
          variant="solid"
          action="secondary"
          onPress={() => uploadAvatarMutation(user.id)}
          className="absolute right-0 bottom-0 px-1.5 py-1.5"
        >
          <Icon className="text-sm text-typography-950" />
        </IconButton>
      )}
    </Avatar>
  );
}
