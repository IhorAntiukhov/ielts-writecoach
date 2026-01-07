import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import FormInput from "@/src/ui/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { resetPassword } from "../api/auth";
import { EmailFormData, emailFormSchema } from "../forms/signInForm";

interface ForgotPasswordFormProps {
  openSignInForm: () => void;
}

export default function ForgotPasswordForm({
  openSignInForm,
}: ForgotPasswordFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
  });

  const showToast = useToast();

  const { mutate: resetPasswordMutation, isPending } = useMutation({
    mutationFn: ({ email }: EmailFormData) => resetPassword(email),
    onSuccess: () => {
      showToast("success", "Password reset", "Check your email");
    },
    onError(error) {
      showToast("error", "Password reset", error.message);
    },
  });

  const handleResetPassword = handleSubmit((formData) => {
    resetPasswordMutation(formData);
  });

  return (
    <VStack space="3xl">
      <HStack className="items-center">
        <Button
          action="default"
          onPress={openSignInForm}
          className="pl-0 py-0 pr-2"
        >
          <ButtonIcon
            as={ArrowLeft}
            className="text-typography-500"
            size="lg"
          />
        </Button>

        <Text className="text-typography-500 text-2xl">Return to sign in</Text>
      </HStack>

      <FormInput
        name="email"
        control={control}
        icon={Mail}
        placeholder="Email"
        keyboardType="email-address"
        errors={errors}
      />

      <SecondaryButton onPress={handleResetPassword} isLoading={isPending}>
        Send a passwordless login link
      </SecondaryButton>
    </VStack>
  );
}
