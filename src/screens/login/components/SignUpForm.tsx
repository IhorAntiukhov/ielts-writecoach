import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import OutlineInput from "@/src/ui/input/OutlineInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleUser, Lock, Mail, UserRoundPlus } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpFormSchema } from "../../../forms/signUpForm";
import { signUp } from "../api/auth";

export default function SignUpForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const showToast = useToast();

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: ({ userName, email, password }: SignUpFormData) =>
      signUp(userName, email, password),
    onSuccess: () => {
      showToast("success", "Sign up", "Confirm the user via email");
    },
    onError(error) {
      showToast("error", "Sign up", error.message);
    },
  });

  const handleSignUp = handleSubmit((formData) => {
    signUpMutation(formData);
  });

  return (
    <VStack space="3xl">
      <VStack space="md">
        <OutlineInput
          name="userName"
          control={control}
          icon={CircleUser}
          placeholder="User name"
          keyboardType="default"
          errors={errors}
        />

        <OutlineInput
          name="email"
          control={control}
          icon={Mail}
          placeholder="Email"
          keyboardType="email-address"
          errors={errors}
        />
      </VStack>

      <VStack space="md">
        <OutlineInput
          name="password"
          control={control}
          icon={Lock}
          placeholder="Password"
          keyboardType="password"
          errors={errors}
        />

        <OutlineInput
          name="confirmPassword"
          control={control}
          icon={Lock}
          placeholder="Confirm password"
          keyboardType="password"
          errors={errors}
        />
      </VStack>

      <PrimaryButton
        onPress={handleSignUp}
        icon={UserRoundPlus}
        isLoading={isPending}
      >
        Sign up
      </PrimaryButton>
    </VStack>
  );
}
