import { Button, ButtonText } from "@/components/ui/button";
import { clsx } from "clsx";
import React from "react";
import { PressableProps } from "react-native";

type TextButtonProps = React.PropsWithChildren & PressableProps;

export default function TextButton({
  children,
  className,
  ...rest
}: TextButtonProps) {
  return (
    <Button action="default" className={clsx("px-0", className)} {...rest}>
      <ButtonText className="text-secondary-500">{children}</ButtonText>
    </Button>
  );
}
