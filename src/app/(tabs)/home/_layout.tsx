import StackWithBackgroundColor from "@/src/layout/StackWithBackgroundColor";
import EssayNavigationProvider from "@/src/screens/essay/shared/context/EssayNavigationProvider";

export default function IndexLayout() {
  return (
    <EssayNavigationProvider>
      <StackWithBackgroundColor />
    </EssayNavigationProvider>
  );
}
