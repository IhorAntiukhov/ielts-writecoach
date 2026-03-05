import { HStack } from "@/components/ui/hstack";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { RefreshCcw, ZoomIn, ZoomOut } from "lucide-react-native";
import {
  getTransformComponents,
  setScale,
  useChartTransformState,
} from "victory-native";

cssInteropIcon(ZoomOut);
cssInteropIcon(RefreshCcw);
cssInteropIcon(ZoomIn);

interface LineChartPanelProps {
  transformState: ReturnType<typeof useChartTransformState>["state"];
}

export default function ChartZoomPanel({
  transformState,
}: LineChartPanelProps) {
  const getScaleX = () => {
    const { scaleX } = getTransformComponents(transformState.matrix.value);

    return scaleX;
  };

  const zoomOut = () => {
    transformState.matrix.set(
      setScale(transformState.matrix.value, getScaleX() - 0.15, 1.0),
    );
  };

  const resetZoom = () => {
    transformState.matrix.set(setScale(transformState.matrix.value, 1.0, 1.0));
  };

  const zoomIn = () => {
    transformState.matrix.set(
      setScale(transformState.matrix.value, getScaleX() + 0.15, 1.0),
    );
  };

  return (
    <HStack space="md" className="justify-center">
      <IconButton action="secondary" onPress={zoomOut}>
        <ZoomOut className="text-white" size={20} />
      </IconButton>

      <IconButton action="secondary" onPress={resetZoom}>
        <RefreshCcw className="text-white" size={20} />
      </IconButton>

      <IconButton action="secondary" onPress={zoomIn}>
        <ZoomIn className="text-white" size={20} />
      </IconButton>
    </HStack>
  );
}
