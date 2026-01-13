import { Card } from "@/components/ui/card/index";
import React from "react";

export default function CardBox({ children }: React.PropsWithChildren) {
  return (
    <Card
      size="md"
      variant="elevated"
      className="w-full max-w-[600px] px-8 py-6 bg-background-0 rounded-lg"
    >
      {children}
    </Card>
  );
}
