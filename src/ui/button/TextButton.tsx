import { Button, ButtonText } from "@/components/ui/button";
import { clsx } from "clsx";
import { PressableProps } from "react-native";
import ChildrenProp from "../../types/childrenProp";

type TextButtonProps = ChildrenProp & PressableProps;

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
