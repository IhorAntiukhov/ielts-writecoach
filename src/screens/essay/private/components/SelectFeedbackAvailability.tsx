import { VStack } from "@/components/ui/vstack";
import { changeFeedbackAvailability } from "@/src/api/reviewsRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import FeedbackAvailabilityType from "@/src/types/feedbackAvailabilityType";
import CardBox from "@/src/ui/CardBox";
import Dropdown from "@/src/ui/Dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import { Text } from "react-native";
import EssayDataContext from "../../shared/context/EssayDataContext";
import feedbackAvailabilityOptions from "../constants/feedbackAvailabilityOptions";

export default function SelectFeedbackAvailability() {
  const { data } = use(EssayDataContext)!;

  const queryClient = useQueryClient();

  const [feedbackAvailability, setFeedbackAvailability] =
    useState<FeedbackAvailabilityType>(
      data?.feedback_availability || "reactions-and-comments",
    );

  useEffect(() => {
    if (data) setFeedbackAvailability(data.feedback_availability);
  }, [data]);

  const { mutate: changeFeedbackAvailabilityMutation, isPending } = useMutation(
    {
      mutationFn: (feedbackAvailability: FeedbackAvailabilityType) =>
        changeFeedbackAvailability(data?.id!, feedbackAvailability),
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey[0] === queryKeyPrefixes.privateEssay ||
            queryKey[0] === queryKeyPrefixes.publicEssay,
        });
      },
    },
  );

  useEffect(() => {});

  return (
    <CardBox>
      <VStack space="2xl">
        <Text className="text-typography-950 text-lg">
          Set feedback availability
        </Text>

        <Dropdown<FeedbackAvailabilityType>
          selectedValue={feedbackAvailability}
          onChange={(value) => {
            if (!isPending) changeFeedbackAvailabilityMutation(value);
          }}
          options={feedbackAvailabilityOptions}
          initialLabel={
            feedbackAvailabilityOptions.find(
              (option) => option.value === data?.feedback_availability,
            )?.label || "Reactions and comments"
          }
        />
      </VStack>
    </CardBox>
  );
}
