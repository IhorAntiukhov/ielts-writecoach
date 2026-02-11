import { useRouter } from "expo-router";

export default function useOpenUserProfile(userId: string) {
  const router = useRouter();

  const openUserProfile = () => {
    router.push({
      pathname: "/(tabs)/home/users/[id]",
      params: {
        id: userId,
      },
    });
  };

  return { openUserProfile };
}
