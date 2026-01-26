import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
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
      {isLoading && <ButtonSpinner />}
      {icon && <ButtonIcon as={icon} />}
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
