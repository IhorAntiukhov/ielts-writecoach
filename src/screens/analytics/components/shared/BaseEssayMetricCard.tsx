import { SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import CardBox from "@/src/ui/CardBox";
import React from "react";
import { Text } from "react-native";

interface BaseEssayMetricCardProps extends React.PropsWithChildren {
  title: string;
  isPending: boolean;
  skeletonLines: number;
}

export default function BaseEssayMetricCard({
  title,
  isPending,
  skeletonLines,
  children,
}: BaseEssayMetricCardProps) {
  return (
    <CardBox>
      <VStack space="lg">
        <Text className="text-md text-typography-500">{title}</Text>

        {isPending ? (
          <SkeletonText _lines={skeletonLines} className="h-2" />
        ) : (
          children
        )}
      </VStack>
    </CardBox>
  );
}
