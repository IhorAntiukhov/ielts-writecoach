import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import FormInput from "@/src/ui/FormInput";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
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

const BackIcon = cssInteropIcon(ArrowLeft);

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
      <HStack className="items-center" space="sm">
        <IconButton
          action="secondary"
          className="bg-transparent"
          onPress={openSignInForm}
        >
          <BackIcon className="text-typography-950 text-2xl" />
        </IconButton>

        <Text className="text-typography-950 text-2xl">Return to sign in</Text>
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
