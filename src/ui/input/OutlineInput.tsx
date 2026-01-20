import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import FormWrapper from "./components/FormWrapper";
import InputProps from "./types/inputProps";
import OutlineInputProps from "./types/outlineInputProps";

export default function OutlineInput<T extends FieldValues>({
  name,
  control,
  icon,
  placeholder,
  keyboardType,
  errors,
}: OutlineInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <FormWrapper name={name} errors={errors}>
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
    </FormWrapper>
  );
}
