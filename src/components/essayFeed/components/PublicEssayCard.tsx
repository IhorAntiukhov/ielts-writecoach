import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PublicFeedEssay } from "@/src/api/essaysRepo/types/feedEssayTypes";
import useOpenUserProfile from "@/src/hooks/useOpenUserProfile";
import CardBox from "@/src/ui/CardBox";
import { Pressable, Text, View } from "react-native";
import PublishedDate from "../../publishedDate";
import EssayBaseCard from "./EssayBaseCard";
import OpenEssayButton from "./OpenEssayButton";

interface PublicEssayCardProps {
  data: PublicFeedEssay;
}

export default function PublicEssayCard({ data }: PublicEssayCardProps) {
  const { openUserProfile } = useOpenUserProfile(data.user_id!);

  return (
    <CardBox>
      <VStack space="lg">
        <HStack space="md" className="items-center justify-between">
          <Pressable onPress={openUserProfile}>
            <HStack space="md">
              <Avatar size="md">
                <AvatarFallbackText>{data.user_name}</AvatarFallbackText>
                <AvatarImage source={{ uri: data.avatar_url! }} />
              </Avatar>

              <VStack space="xs">
                <Text className="text-typography-950 text-lg">
                  {data.user_name}
                </Text>
                <PublishedDate createdAt={data.created_at!} />
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
