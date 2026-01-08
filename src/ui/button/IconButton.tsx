import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PressableProps } from "react-native";

export default function IconButton({
  children,
  className,
  ...rest
}: PressableProps) {
  return (
    <Button
      variant="solid"
      className={clsx("w-auto aspect-square rounded-full", className)}
      {...rest}
    >
      {children}
    </Button>
  );
}
