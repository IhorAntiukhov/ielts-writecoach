import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Text } from "react-native";

interface BaseDisplayableUserPropertyProps {
  name: string;
  value: string;
}

interface StandardDisplayableUserPropertyProps extends BaseDisplayableUserPropertyProps {
  type: "displayable";
}

interface EditableUserPropertyProps extends BaseDisplayableUserPropertyProps {
  type: "editable";
  isEditModeOn: boolean;
  editInputComponent: React.JSX.Element;
}

type DisplayableUserPropertyProps =
  | StandardDisplayableUserPropertyProps
  | EditableUserPropertyProps;

export default function DisplayableUserProperty(
  props: DisplayableUserPropertyProps,
) {
  return (
    <VStack space="xs" className="flex-grow">
      <Text className="text-typography-500">{props.name}</Text>
      {props.type === "editable" && props.isEditModeOn ? (
        props.editInputComponent
      ) : (
        <Text className="text-typography-950">{props.value}</Text>
      )}
    </VStack>
  );
}
