import { clsx } from "clsx";
import { Text } from "react-native";

interface IndicatorTextProps {
  children: React.ReactNode;
  isError?: boolean;
  className?: string;
}

export default function IndicatorText({
  children,
  isError,
  className,
}: IndicatorTextProps) {
  return (
    <Text
      className={clsx(
        "text-lg text-center",
        isError ? "text-error-950" : "text-typography-500",
        className,
      )}
    >
      {children}
    </Text>
  );
}
