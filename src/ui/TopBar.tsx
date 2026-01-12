import { HStack } from "@/components/ui/hstack";
import { ArrowLeft } from "lucide-react-native";
import { Text } from "react-native";
import cssInteropIcon from "../utils/cssInteropIcon";
import IconButton from "./button/IconButton";

const BackIcon = cssInteropIcon(ArrowLeft);

interface TopBarProps {
  title: string;
  onBack: () => any;
}

export default function TopBar({ title, onBack }: TopBarProps) {
  return (
    <HStack className="items-center" space="sm">
      <IconButton
        action="secondary"
        className="bg-transparent"
        onPress={onBack}
      >
        <BackIcon className="text-typography-950 text-2xl" />
      </IconButton>

      <Text className="text-typography-950 text-2xl">{title}</Text>
    </HStack>
  );
}
