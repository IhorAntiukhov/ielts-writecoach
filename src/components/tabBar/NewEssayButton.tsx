import useOpenNewEssay from "@/src/hooks/useOpenNewEssay";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { Plus } from "lucide-react-native";

cssInteropIcon(Plus);

export default function NewEssayButton() {
  const { openNewEssay } = useOpenNewEssay();

  return (
    <IconButton
      className="absolute z-10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 elevation-md px-1 py-1"
      onPress={openNewEssay}
    >
      <Plus size={32} className="text-typography-950" />
    </IconButton>
  );
}
