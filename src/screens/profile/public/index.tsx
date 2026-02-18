import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { getUserData } from "@/src/api/userRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import IndicatorText from "@/src/ui/IndicatorText";
import TopBar from "@/src/ui/TopBar";
import formatDate from "@/src/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import DisplayableUserProperty from "../shared/components/DisplayableUserProperty";
import ProfileHeader from "../shared/components/ProfileHeader";
import UserStatsCard from "../shared/components/UserStatsCard";

export default function PublicUserScreen() {
  const { id } = useLocalSearchParams();

  const { data, isPending, error, isError } = useQuery({
    queryKey: [queryKeyPrefixes.userData, id],
    queryFn: () => getUserData(id as string),
  });

  return (
    <>
      <TopBar title="User profile" backToHref="/(tabs)/home" solidBackground />

      <Container topAlignment>
        <VStack space="2xl" className="items-center w-full">
          <CardBox>
            <VStack space="3xl">
              <ProfileHeader>
                <Skeleton
                  className="absolute w-24 h-24 rounded-full z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 elevation-md"
                  isLoaded={!isPending}
                />
                {data && (
                  <Avatar
                    size="xl"
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 elevation-md"
                  >
                    <AvatarFallbackText>{data?.user_name}</AvatarFallbackText>
                    {data?.avatar_url && (
                      <AvatarImage
                        source={{
                          uri: data.avatar_url,
                        }}
                      />
                    )}
                  </Avatar>
                )}
              </ProfileHeader>

              {isPending ? (
                <SkeletonText _lines={1} className="h-2" />
              ) : isError ? (
                <IndicatorText isError>
                  Failed to get user data: {error.message}
                </IndicatorText>
              ) : (
                <>
                  <DisplayableUserProperty
                    type="displayable"
                    name="User name"
                    value={data?.user_name!}
                  />

                  <DisplayableUserProperty
                    type="displayable"
                    name="Created at"
                    value={formatDate(data.created_at)}
                  />
                </>
              )}
            </VStack>
          </CardBox>

          <UserStatsCard isPublicProfile />
        </VStack>
      </Container>
    </>
  );
}
