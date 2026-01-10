import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import React from "react";

export default function IconButton({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="solid"
      className={clsx("w-auto aspect-square rounded-full p-2", className)}
      {...rest}
    >
      {children}
    </Button>
  );
}
