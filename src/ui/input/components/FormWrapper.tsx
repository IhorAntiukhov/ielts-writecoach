import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "lucide-react-native";
import React from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormProps<T extends FieldValues> extends React.PropsWithChildren {
  name: Path<T>;
  errors: FieldErrors<T>;
}

export default function FormWrapper<T extends FieldValues>({
  children,
  name,
  errors,
}: FormProps<T>) {
  return (
    <FormControl isInvalid={!!errors[name]}>
      <VStack space="xs">
        {children}
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            {errors[name]?.message?.toString() || ""}
          </FormControlErrorText>
        </FormControlError>
      </VStack>
    </FormControl>
  );
}
