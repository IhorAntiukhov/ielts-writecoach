import { Card } from "@/components/ui/card/index";
import React from "react";
import ChildrenProp from "../types/childrenProp";

export default function CardBox({ children }: ChildrenProp) {
  return (
    <Card
      size="md"
      variant="elevated"
      className="w-full px-8 py-6 bg-background-0 rounded-lg"
    >
      {children}
    </Card>
  );
}
