import { Divider } from "@/components/ui/divider";
import { clsx } from "clsx";
import { View } from "react-native";
import useIsLargeScreen from "../hooks/useIsLargeScreen";

interface DividerWithMarginsProps {
  notInCard?: boolean;
}

export default function DividerWithMargins({
  notInCard,
}: DividerWithMarginsProps) {
  const isLargeScreen = useIsLargeScreen();

  return (
    <View className={clsx((!isLargeScreen || !notInCard) && "-mx-8")}>
      <Divider />
    </View>
  );
}
