import { useRouter } from "expo-router";
import { use } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useOpenUserProfile(userId: string, ownUserId?: string) {
  const ownUserDataId = use(AuthContext).session?.user.id || ownUserId;
  const router = useRouter();

  const openUserProfile = () => {
    router.push({
      pathname: `/(tabs)/${ownUserDataId === userId ? "profile" : "home/users/[id]"}`,
      params: {
        id: userId,
      },
    });
  };

  return { openUserProfile };
}
