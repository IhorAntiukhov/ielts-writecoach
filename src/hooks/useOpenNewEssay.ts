import { useRouter } from "expo-router";

export default function useOpenNewEssay() {
  const router = useRouter();

  const openNewEssay = () => {
    router.push({
      pathname: "/(tabs)/private/[id]",
      params: {
        id: "new-essay",
      },
    });
  };

  return { openNewEssay };
}
