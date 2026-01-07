import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { PressableProps } from "react-native";

type SecondaryButtonProps = {
  children: string;
  isLoading: boolean;
} & PressableProps;

export default function SecondaryButton({
  children,
  isLoading,
  ...rest
}: SecondaryButtonProps) {
  return (
    <Button action="secondary" isDisabled={isLoading} {...rest}>
      {isLoading && <ButtonSpinner />}
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}
