import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "lucide-react-native";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, any, T>;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  errors: FieldErrors<T>;
}

export default function UnderlinedInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  keyboardType,
  errors,
}: InputProps<T>) {
  return (
    <FormControl isInvalid={!!errors[name]}>
      <VStack space="xs">
        <Input variant="underlined" size="md">
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
              />
            )}
          />
        </Input>
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
