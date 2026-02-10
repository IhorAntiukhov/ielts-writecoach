import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react-native";
import React from "react";

interface SecondaryButtonProps extends React.ComponentProps<typeof Button> {
  children: string;
  icon: LucideIcon;
  isLoading?: boolean;
}

export default function SecondaryButton({
  children,
  icon,
  isLoading,
  action,
  ...rest
}: SecondaryButtonProps) {
  return (
    <Button action={action || "secondary"} disabled={isLoading} {...rest}>
      {isLoading && <ButtonSpinner color="white" />}
      {icon && (
        <ButtonIcon
          as={icon}
          className={clsx(
            "text-lg",
            action === "secondary" && "text-typography-950",
          )}
        />
      )}
      <ButtonText
        action={
          action === "default" || action === undefined ? "secondary" : action
        }
      >
        {children}
      </ButtonText>
    </Button>
  );
}
