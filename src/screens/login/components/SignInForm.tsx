import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import OutlineInput from "@/src/ui/input/OutlineInput";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import TextButton from "@/src/ui/button/TextButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Lock, LogIn, Mail } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { SignInFormData, signInFormSchema } from "../../../forms/signInForm";
import { signIn } from "@/src/api/auth";
import GoogleSignInButton from "./GoogleSignInButton";

interface SignInFormProps {
  openForgotPasswordForm: () => void;
}

export default function SignInForm({
  openForgotPasswordForm,
}: SignInFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const showToast = useToast();

  const { mutate: signInMutation, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInFormData) =>
      signIn(email, password),
    onSuccess: () => {
      showToast("success", "Sign in", "Successfully logged in");
    },
    onError(error) {
      showToast("error", "Sign in", error.message);
    },
  });

  const handleSignIn = handleSubmit((formData) => {
    signInMutation(formData);
  });

  return (
    <VStack space="4xl">
      <VStack space="3xl">
        <VStack space="md">
          <OutlineInput
            name="email"
            control={control}
            icon={Mail}
            placeholder="Email"
            keyboardType="email-address"
            errors={errors}
          />

          <VStack>
            <OutlineInput
              name="password"
              control={control}
              icon={Lock}
              placeholder="Password"
              keyboardType="password"
              errors={errors}
            />

            <TextButton onPress={openForgotPasswordForm} className="self-end">
              Forgot password?
            </TextButton>
          </VStack>
        </VStack>

        <PrimaryButton
          onPress={handleSignIn}
          icon={LogIn}
          isLoading={isPending}
        >
          Sign in
        </PrimaryButton>
      </VStack>

      <View className="relative -mx-8 flex justify-center items-center">
        <Divider />
        <Text className="absolute text-typography-500 text-lg bg-background-0 px-2">
          Or
        </Text>
      </View>

      <GoogleSignInButton />
    </VStack>
  );
}
