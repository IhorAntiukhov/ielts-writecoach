import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { clsx } from "clsx";
import { Controller, FieldValues } from "react-hook-form";
import FormWrapper from "./components/FormWrapper";
import TextAreaInputProps from "./types/textAreaInputProps";

export default function TextAreaInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  keyboardType,
  errors,
  maxLength,
  autoCorrect,
  largeTextArea,
}: TextAreaInputProps<T>) {
  return (
    <FormWrapper name={name} errors={errors}>
      <Textarea
        className={clsx(
          "bg-background-50 rounded-lg px-1.5 pt-1.5 pb-4",
          largeTextArea && `h-72`,
        )}
      >
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
              autoCorrect={autoCorrect}
              maxLength={maxLength}
            />
          )}
        />
      </Textarea>
    </FormWrapper>
  );
}
