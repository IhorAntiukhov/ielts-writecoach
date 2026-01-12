import { VStack } from "@/components/ui/vstack";
import { AuthContext } from "@/src/context/AuthProvider";
import { EmailFormData, emailFormSchema } from "@/src/forms/signInForm";
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
import { changeUserProperties, signOut } from "./api/user";
import UserProperty from "./components/UserProperty";
import { userNameFormSchema, UserNameFormData } from "@/src/forms/signUpForm";

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

            <UserProperty<UserNameFormData>
              name="User name"
              value={user.user_metadata.name || "Unknown"}
              controlName="userName"
              schema={userNameFormSchema}
              mutationFn={({ userName }: UserNameFormData) =>
                changeUserProperties({ userName })
              }
              placeholder="Type new user name"
              keyboardType="default"
              toastTitle="User name change"
              toastSuccessMessage="User name changed successfully"
            />

            <UserProperty<EmailFormData>
              name="Email"
              value={user.email || "Unknown"}
              controlName="email"
              schema={emailFormSchema}
              mutationFn={({ email }: EmailFormData) =>
                changeUserProperties({ email })
              }
              placeholder="Type new email"
              keyboardType="email-address"
              toastTitle="Email change"
              toastSuccessMessage="Confirm the new email"
            />
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
