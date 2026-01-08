import { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";

export default function cssInteropIcon(Icon: LucideIcon) {
  return cssInterop(Icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        width: true,
        height: true,
      },
    },
  });
}
