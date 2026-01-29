import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";

const Icon = cssInteropIcon(Plus);

export default function NewEssayButton() {
  const router = useRouter();

  const handleNewEssay = () => {
    router.push({
      pathname: "/(tabs)/private/[id]",
      params: {
        id: "15",
      },
    });
  };

  return (
    <IconButton
      className="absolute z-10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 elevation-md"
      onPress={handleNewEssay}
    >
      <Icon size={32} className="text-typography-950" />
    </IconButton>
  );
}
