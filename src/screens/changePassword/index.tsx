import { VStack } from "@/components/ui/vstack";
import {
  ChangePasswordFormData,
  changePasswordFormSchema,
} from "@/src/forms/signUpForm";
import useToast from "@/src/hooks/useToast";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import OutlineInput from "@/src/ui/input/OutlineInput";
import TopBar from "@/src/ui/TopBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Lock, RefreshCw } from "lucide-react-native";
import { useForm } from "react-hook-form";
import changePassword from "./api/changePassword";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const showToast = useToast();

  const { mutate: changePasswordMutation, isPending } = useMutation({
    mutationFn: ({ password }: ChangePasswordFormData) =>
      changePassword(password),
    onSuccess: () => {
      showToast(
        "success",
        "Password change",
        "Password was changed successfully",
      );
    },
    onError(error) {
      showToast("error", "Password change", error.message);
    },
  });

  const handleChangePassword = handleSubmit((formData) => {
    changePasswordMutation(formData);
  });

  return (
    <Container topAlignment>
      <CardBox>
        <VStack space="3xl">
          <TopBar title="Back to the profile" onBack={() => router.back()} />

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

          <SecondaryButton
            onPress={handleChangePassword}
            icon={RefreshCw}
            isLoading={isPending}
          >
            Change password
          </SecondaryButton>
        </VStack>
      </CardBox>
    </Container>
  );
}
