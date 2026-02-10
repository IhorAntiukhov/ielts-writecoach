import useOpenNewEssay from "@/src/hooks/useOpenNewEssay";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import { Plus } from "lucide-react-native";

export default function NewEssayButton() {
  const { openNewEssay } = useOpenNewEssay();
  return (
    <PrimaryButton icon={Plus} onPress={openNewEssay} className="mb-4">
      New essay
    </PrimaryButton>
  );
}
