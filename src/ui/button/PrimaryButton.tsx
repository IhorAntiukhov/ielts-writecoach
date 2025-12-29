import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { gradientColors } from "@/components/ui/gluestack-ui-provider/config";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop, useColorScheme } from "nativewind";
import { PressableProps } from "react-native";
import ChildrenProp from "../../types/childrenProp";

cssInterop(LinearGradient, {
  className: "style",
});

type PrimaryButtonProps = ChildrenProp &
  PressableProps & { isLoading?: boolean };

export default function PrimaryButton({
  children,
  isLoading,
  className,
  ...rest
}: PrimaryButtonProps) {
  const { colorScheme } = useColorScheme();

  return (
    <LinearGradient
      className="py-1 rounded-lg active:opacity-70 duration-100"
      colors={[
        `rgb(${gradientColors.start[colorScheme || "light"]})`,
        `rgb(${gradientColors.end[colorScheme || "light"]})`,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Button
        action="default"
        disabled={isLoading}
        className={clsx("px-6", className)}
        {...rest}
      >
        {isLoading && <ButtonSpinner color="white" />}
        <ButtonText className="text-center align-middle text-lg text-white font-bold">
          {children}
        </ButtonText>
      </Button>
    </LinearGradient>
  );
}
