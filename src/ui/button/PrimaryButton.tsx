import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { gradientColors } from "@/components/ui/gluestack-ui-provider/config";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { LucideIcon } from "lucide-react-native";
import { cssInterop, useColorScheme } from "nativewind";
import React from "react";

cssInterop(LinearGradient, {
  className: "style",
});

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  children: string;
  icon: LucideIcon;
  isLoading?: boolean;
}

export default function PrimaryButton({
  children,
  icon,
  isLoading,
  className,
  ...rest
}: PrimaryButtonProps) {
  const { colorScheme } = useColorScheme();

  return (
    <Button
      action="secondary"
      disabled={isLoading}
      className={clsx(
        "flex flex-row items-stretch px-0 flex-grow active:opacity-70 bg-transparent data-[active=true]:bg-transparent web:data-[hover=true]:bg-transparent gap-2",
        className,
      )}
      {...rest}
    >
      <LinearGradient
        className="flex-grow flex flex-row items-center justify-center rounded-md gap-2"
        colors={[
          `rgb(${gradientColors.start[colorScheme || "light"]})`,
          `rgb(${gradientColors.end[colorScheme || "light"]})`,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {isLoading && <ButtonSpinner color="white" />}
        {icon && <ButtonIcon as={icon} className="text-lg text-white" />}
        <ButtonText className="text-center align-middle text-lg text-white font-bold">
          {children}
        </ButtonText>
      </LinearGradient>
    </Button>
  );
}
