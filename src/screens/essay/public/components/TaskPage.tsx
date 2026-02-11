import { VStack } from "@/components/ui/vstack";
import EssayInstructions from "@/src/components/essayInstructions";
import CardBox from "@/src/ui/CardBox";
import IndicatorText from "@/src/ui/IndicatorText";
import SkeletonCard from "@/src/ui/SkeletonCard";
import SmallCardBox from "@/src/ui/SmallCardBox";
import { getNounByNumber } from "@/src/utils/getNounByNumber";
import { use } from "react";
import { Text } from "react-native";
import EssayDataContext from "../../shared/context/EssayDataContext";
import formatSeconds from "../../shared/utils/formatSeconds";
import EssayHeader from "./EssayHeader";

export default function TaskPage() {
  const { type, data, error, isPending, isError } = use(EssayDataContext)!;

  if (type !== "public") throw Error("Essay must be public");

  if (isError || !data) {
    return (
      <IndicatorText isError>
        Failed to get the essay data: {error?.message}
      </IndicatorText>
    );
  }

  return (
    <VStack space="2xl">
      {isPending ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <CardBox>
            <VStack space="2xl">
              <EssayHeader type="public" data={data} />

              <EssayInstructions type="public" data={data} isFullPublicEssay />
            </VStack>
          </CardBox>

          <CardBox>
            <VStack space="lg">
              {data.time && (
                <Text className="text-typography-500 text-md">
                  Completed in {formatSeconds(data.time)}
                </Text>
              )}

              <SmallCardBox className="items-stretch justify-stretch px-3 py-2">
                <Text className="text-typography-950 text-md">
                  {data.response}
                </Text>
              </SmallCardBox>

              <Text className="text-typography-500 text-right text-md">
                {data.word_count}
                {getNounByNumber(data.word_count, " word")}
              </Text>
            </VStack>
          </CardBox>
        </>
      )}
    </VStack>
  );
}
