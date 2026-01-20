import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Controller, FieldValues } from "react-hook-form";
import FormWrapper from "./components/FormWrapper";
import InputProps from "./types/inputProps";

export default function TextAreaInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  keyboardType,
  errors,
}: InputProps<T>) {
  return (
    <FormWrapper name={name} errors={errors}>
      <Textarea>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextareaInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={
                keyboardType === "password" ? undefined : keyboardType
              }
            />
          )}
        />
      </Textarea>
    </FormWrapper>
  );
}
