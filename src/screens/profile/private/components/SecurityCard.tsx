import { VStack } from "@/components/ui/vstack";
import { signOut } from "@/src/api/auth";
import useToast from "@/src/hooks/useToast";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import CardBox from "@/src/ui/CardBox";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Lock, LogOut } from "lucide-react-native";
import { Text, View } from "react-native";

export default function SecurityCard() {
  const toast = useToast();

  const { mutate: signOutMutation } = useMutation({
    mutationFn: signOut,
    onError: (error) => {
      toast("error", "Sign out", error.message);
    },
  });
  const router = useRouter();

  return (
    <View className="items-center w-full">
      <CardBox>
        <VStack space="3xl">
          <Text className="text-2xl text-red-500 font-bold">Security</Text>

          <VStack space="md">
            <SecondaryButton
              isLoading={false}
              icon={Lock}
              onPress={() => router.push("/(tabs)/profile/change-password")}
              action="negative"
            >
              Change password
            </SecondaryButton>

            <SecondaryButton
              isLoading={false}
              icon={LogOut}
              onPress={() => signOutMutation()}
              action="negative"
            >
              Logout
            </SecondaryButton>
          </VStack>
        </VStack>
      </CardBox>
    </View>
  );
}
