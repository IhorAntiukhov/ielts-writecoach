import { VStack } from "@/components/ui/vstack";
import { resetPassword } from "@/src/api/auth";
import useToast from "@/src/hooks/useToast";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import OutlineInput from "@/src/ui/input/OutlineInput";
import TopBar from "@/src/ui/TopBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { EmailFormData, emailFormSchema } from "../../../forms/signInForm";

export default function ForgotPasswordForm() {
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
      <TopBar title="Return to sign in" backToHref="/(auth)" />

      <OutlineInput
        name="email"
        control={control}
        icon={Mail}
        placeholder="Email"
        keyboardType="email-address"
        errors={errors}
      />

      <SecondaryButton
        onPress={handleResetPassword}
        icon={Mail}
        isLoading={isPending}
      >
        Send a passwordless login link
      </SecondaryButton>
    </VStack>
  );
}
