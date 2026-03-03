import roboto from "@/assets/fonts/roboto.ttf";
import { useFont } from "@shopify/react-native-skia";

export default function useChartFont(size = 12) {
  return {
    font: useFont(roboto, size),
  };
}
