import { useWindowDimensions } from "react-native";

export default function useIsLargeScreen() {
  const { width } = useWindowDimensions();

  return width >= 750;
}
