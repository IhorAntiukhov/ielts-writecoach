import { useRouter } from "expo-router";
import { use } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useOpenEssay(
  isPrivateFeed: boolean,
  essayId: number,
  userId: string,
) {
  const { user } = use(AuthContext).session!;
  const router = useRouter();

  const openEssay = () => {
    router.push({
      pathname: `/(tabs)/${isPrivateFeed || user.id === userId ? "private" : "home"}/[id]`,
      params: {
        id: Number(essayId),
      },
    });
  };

  return { openEssay };
}
