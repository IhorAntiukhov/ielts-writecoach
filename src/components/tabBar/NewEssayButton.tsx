import useIsLargeScreen from "@/src/hooks/useIsLargeScreen";
import useOpenNewEssay from "@/src/hooks/useOpenNewEssay";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { clsx } from "clsx";
import { Plus } from "lucide-react-native";

cssInteropIcon(Plus);

export default function NewEssayButton() {
  const { openNewEssay } = useOpenNewEssay();

  const isLargeScreen = useIsLargeScreen();

  return (
    <IconButton
      className={clsx(
        isLargeScreen
          ? "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
          : "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "absolute z-10 elevation-md px-1 py-1",
      )}
      onPress={openNewEssay}
    >
      <Plus size={32} className="text-typography-950" />
    </IconButton>
  );
}
