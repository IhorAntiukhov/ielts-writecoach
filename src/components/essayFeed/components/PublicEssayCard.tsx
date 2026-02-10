import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PublicEssay } from "@/src/api/essaysRepo/types/essayTypes";
import CardBox from "@/src/ui/CardBox";
import formatDate from "@/src/utils/formatDate";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import EssayBaseCard from "./EssayBaseCard";
import OpenEssayButton from "./OpenEssayButton";

interface PublicEssayCardProps {
  data: PublicEssay;
}

export default function PublicEssayCard({ data }: PublicEssayCardProps) {
  const router = useRouter();

  const handleOpenUserProfile = () => {
    router.push({
      pathname: "/(tabs)/index/users/[id]",
      params: {
        id: data.user_id!.toString(),
      },
    });
  };

  return (
    <CardBox>
      <VStack space="lg">
        <HStack space="md" className="items-center justify-between">
          <Pressable onPress={handleOpenUserProfile}>
            <HStack space="md">
              <Avatar size="md">
                <AvatarFallbackText>{data.user_name}</AvatarFallbackText>
                <AvatarImage source={{ uri: data.avatar_url! }} />
              </Avatar>

              <VStack space="xs">
                <Text className="text-typography-950 text-lg">
                  {data.user_name}
                </Text>
                <Text className="text-typography-500 text-md">
                  {formatDate(data.created_at!)}
                </Text>
              </VStack>
            </HStack>
          </Pressable>

          <View className="-mr-2">
            <OpenEssayButton
              privacy="public"
              essayId={data.id!}
              userId={data.user_id!}
            />
          </View>
        </HStack>

        <EssayBaseCard type="public" data={data} />
      </VStack>
    </CardBox>
  );
}
