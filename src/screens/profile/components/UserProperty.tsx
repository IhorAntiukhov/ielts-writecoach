import { ButtonSpinner } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import UnderlinedInput from "@/src/ui/input/UnderlinedInput";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { Check, Pencil } from "lucide-react-native";
import { useState } from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { KeyboardTypeOptions, Text } from "react-native";
import { $ZodType, $ZodTypeInternals } from "zod/v4/core";

interface UserPropertyProps<T extends FieldValues> {
  name: string;
  value: string;
  controlName: Path<T>;
  schema: $ZodType<unknown, T, $ZodTypeInternals<T, T>>;
  mutationFn: MutationFunction<void, T>;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  toastTitle: string;
  toastSuccessMessage: string;
}

const EditIcon = cssInteropIcon(Pencil);
const SaveIcon = cssInteropIcon(Check);

export default function UserProperty<T extends FieldValues>({
  name,
  value,
  controlName,
  schema,
  mutationFn,
  placeholder,
  keyboardType,
  toastTitle,
  toastSuccessMessage,
}: UserPropertyProps<T>) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  const Icon = isEditModeOn ? SaveIcon : EditIcon;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: {
      [controlName]: value,
    } as DefaultValues<T>,
  });

  const showToast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      showToast("success", toastTitle, toastSuccessMessage);
      setIsEditModeOn(false);
    },
    onError(error) {
      showToast("error", toastTitle, error.message);
    },
  });

  const handleSave = handleSubmit((formData) => {
    mutate(formData);
  });

  const handleIconButton = () => {
    if (isEditModeOn) handleSave();
    else setIsEditModeOn(true);
  };

  return (
    <HStack space="md" className="items-center justify-between">
      <VStack space="xs" className="flex-grow">
        <Text className="text-typography-500">{name}</Text>
        {isEditModeOn ? (
          <UnderlinedInput
            name={controlName}
            control={control}
            placeholder={placeholder}
            keyboardType={keyboardType}
            errors={errors}
          />
        ) : (
          <Text className="text-typography-950">{value}</Text>
        )}
      </VStack>

      <IconButton
        action="secondary"
        className="bg-transparent"
        onPress={handleIconButton}
        disabled={isPending}
      >
        {isPending ? (
          <ButtonSpinner color="white" className="text-xl" />
        ) : (
          <Icon className="text-typography-950 text-xl" />
        )}
      </IconButton>
    </HStack>
  );
}
