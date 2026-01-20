import { HStack } from "@/components/ui/hstack";
import { clsx } from "clsx";
import { Href, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text } from "react-native";
import cssInteropIcon from "../utils/cssInteropIcon";
import IconButton from "./button/IconButton";

const BackIcon = cssInteropIcon(ArrowLeft);

interface TopBarProps {
  title: string;
  backToHref?: Href;
  solidBackground?: boolean;
}

export default function TopBar({
  title,
  backToHref,
  solidBackground,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backToHref) router.dismissTo(backToHref);
    else router.navigate("/(tabs)/profile");
  };

  return (
    <HStack
      space="sm"
      className={clsx(
        "items-center",
        solidBackground && "px-6 py-2 bg-secondary-300",
      )}
    >
      <IconButton
        action="secondary"
        className="bg-transparent"
        onPress={handleBack}
      >
        <BackIcon className="text-typography-950 text-2xl" />
      </IconButton>

      <Text className="text-typography-950 text-2xl">{title}</Text>
    </HStack>
  );
}
