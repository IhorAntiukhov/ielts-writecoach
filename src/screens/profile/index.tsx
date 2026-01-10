import { VStack } from "@/components/ui/vstack";
import { AuthContext } from "@/src/context/AuthProvider";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LogOut } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { use } from "react";
import { Text, View } from "react-native";
import { getUserData, signOut } from "./api/user";
import UserProperty from "./components/UserProperty";

cssInterop(Image, { className: "style" });

export default function ProfileScreen() {
  const { user } = use(AuthContext)!;
  const { data } = useQuery({
    queryKey: [user.id],
    queryFn: () => getUserData(user.id),
  });

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

            <UserProperty name="User name" value={data?.user_name || ""} />
            <UserProperty name="Email" value={user.email || ""} />
          </VStack>
        </CardBox>

        <View>
          <CardBox>
            <VStack space="3xl">
              <Text className="text-2xl text-red-500 font-bold">Security</Text>

              <SecondaryButton
                isLoading={false}
                icon={LogOut}
                onPress={signOut}
                action="negative"
              >
                Logout
              </SecondaryButton>
            </VStack>
          </CardBox>
        </View>
      </VStack>
    </Container>
  );
}
