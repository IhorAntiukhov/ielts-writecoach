import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import FormInput from "@/src/ui/FormInput";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import TextButton from "@/src/ui/button/TextButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { signIn } from "../api/auth";
import { SignInFormData, signInFormSchema } from "../forms/signInForm";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SignInForm() {
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
          <FormInput
            name="email"
            control={control}
            icon={Mail}
            placeholder="Email"
            keyboardType="email-address"
            errors={errors}
          />

          <VStack>
            <FormInput
              name="password"
              control={control}
              icon={Lock}
              placeholder="Password"
              keyboardType="password"
              errors={errors}
            />

            <TextButton className="self-end">Forgot password?</TextButton>
          </VStack>
        </VStack>

        <PrimaryButton onPress={handleSignIn} isLoading={isPending}>
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
