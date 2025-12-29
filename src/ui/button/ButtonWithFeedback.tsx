import { Button } from "@/components/ui/button";
import ChildrenProp from "@/src/types/childrenProp";
import { clsx } from "clsx";
import { PressableProps } from "react-native";

type ButtonWithFeedbackProps = ChildrenProp & PressableProps;

export default function ButtonWithFeedback({
  children,
  className,
  ...rest
}: ButtonWithFeedbackProps) {
  return (
    <Button
      className={clsx(
        "active:scale-95 hover:opacity-70 duration-100",
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}
