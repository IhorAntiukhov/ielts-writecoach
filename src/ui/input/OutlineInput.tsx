import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
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
  icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
  placeholder: string;
  keyboardType: KeyboardTypeOptions | "password";
  errors: FieldErrors<T>;
}

export default function OutlineInput<T extends FieldValues>({
  name,
  control,
  icon,
  placeholder,
  keyboardType,
  errors,
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <FormControl isInvalid={!!errors[name]}>
      <VStack space="xs">
        <Input variant="rounded" size="md">
          <InputSlot className="pl-3">
            <InputIcon as={icon} />
          </InputSlot>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                keyboardType={
                  keyboardType === "password" ? undefined : keyboardType
                }
                type={
                  keyboardType !== "password" || showPassword
                    ? "text"
                    : "password"
                }
              />
            )}
          />
          {keyboardType === "password" && (
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
            </InputSlot>
          )}
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
