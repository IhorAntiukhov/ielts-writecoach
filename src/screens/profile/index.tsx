import { VStack } from "@/components/ui/vstack";
import { AuthContext } from "@/src/context/AuthProvider";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Lock, LogOut } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { use } from "react";
import { Text, View } from "react-native";
import { signOut } from "./api/user";
import UserProperty from "./components/UserProperty";

cssInterop(Image, { className: "style" });

export default function ProfileScreen() {
  const { user } = use(AuthContext).session!;
  const { mutate: signOutMutation } = useMutation({
    mutationFn: signOut,
    onError: () => {},
  });
  const router = useRouter();

  return (
    <Container topAlignment>
      <VStack space="2xl">
        <CardBox>
          <VStack space="3xl">
            <View className="-mx-8 -mt-6">
              <Image
                source={require("@/assets/images/profile-cover.jpg")}
                className="w-full aspect-[5/2] rounded-lg"
                contentFit="cover"
              />
            </View>

            <UserProperty name="User name" value={user.user_metadata.name} />
            <UserProperty name="Email" value={user.email || ""} />
          </VStack>
        </CardBox>

        <View>
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
      </VStack>
    </Container>
  );
}
