import { HStack } from "@/components/ui/hstack";
import { clsx } from "clsx";
import React from "react";

export default function SmallCardBox({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof HStack>) {
  return (
    <HStack
      className={clsx(
        "flex flex-row px-4 py-1.5 bg-background-50 rounded-lg items-center justify-center border border-y border-outline-300",
        className,
      )}
      space="md"
      {...rest}
    >
      {children}
    </HStack>
  );
}
