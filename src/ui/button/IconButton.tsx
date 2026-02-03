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
      className={clsx("rounded-full px-2 py-2 w-auto h-auto", className)}
      {...rest}
    >
      {children}
    </Button>
  );
}
