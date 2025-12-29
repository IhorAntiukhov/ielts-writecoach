import { VStack } from "@/components/ui/vstack";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import FormInput from "@/src/ui/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleUser, Lock, Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { signUp } from "../api/auth";
import { SignUpFormData, signUpFormSchema } from "../forms/signUpForm";

export default function SignUpForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: ({ userName, email, password }: SignUpFormData) =>
      signUp(userName, email, password),
    onSuccess: () => {},
    onError(error, variables, onMutateResult, context) {},
  });

  const handleSignUp = handleSubmit((formData) => {
    signUpMutation(formData);
  });

  return (
    <VStack space="3xl">
      <VStack space="md">
        <FormInput
          name="userName"
          control={control}
          icon={CircleUser}
          placeholder="User name"
          keyboardType="default"
          errors={errors}
        />

        <FormInput
          name="email"
          control={control}
          icon={Mail}
          placeholder="Email"
          keyboardType="email-address"
          errors={errors}
        />
      </VStack>

      <VStack space="md">
        <FormInput
          name="password"
          control={control}
          icon={Lock}
          placeholder="Password"
          keyboardType="password"
          errors={errors}
        />

        <FormInput
          name="confirmPassword"
          control={control}
          icon={Lock}
          placeholder="Confirm password"
          keyboardType="password"
          errors={errors}
        />
      </VStack>

      <PrimaryButton onPress={handleSignUp} isLoading={isPending}>
        Sign up
      </PrimaryButton>
    </VStack>
  );
}
