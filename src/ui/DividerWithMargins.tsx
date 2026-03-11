import { Divider } from "@/components/ui/divider";
import { clsx } from "clsx";
import { Platform, View } from "react-native";

export default function DividerWithMargins() {
  return (
    <View className={clsx(Platform.OS !== "web" && "-mx-8")}>
      <Divider />
    </View>
  );
}
