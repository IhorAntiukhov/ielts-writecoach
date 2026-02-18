import { SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { getUserStats } from "@/src/api/userRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AuthContext } from "@/src/context/AuthProvider";
import CardBox from "@/src/ui/CardBox";
import IndicatorText from "@/src/ui/IndicatorText";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { use } from "react";
import { Text } from "react-native";
import DisplayableUserProperty from "./DisplayableUserProperty";

interface UserStatsCardProps {
  isPublicProfile: boolean;
}

export default function UserStatsCard({ isPublicProfile }: UserStatsCardProps) {
  const { id } = useLocalSearchParams();

  const { user } = use(AuthContext).session!;

  const { data, isPending, error, isError } = useQuery({
    queryKey: [queryKeyPrefixes.userStats, id || user.id],
    queryFn: () =>
      getUserStats(isPublicProfile ? (id as string) : user.id, isPublicProfile),
  });

  return (
    <CardBox>
      <VStack space="2xl">
        <Text className="text-2xl text-typography-950 font-bold">
          User stats
        </Text>

        {isPending ? (
          <SkeletonText _lines={5} className="h-2" />
        ) : isError ? (
          <IndicatorText isError>
            Failed to get user stats: {error.message}
          </IndicatorText>
        ) : (
          data && (
            <>
              <DisplayableUserProperty
                type="displayable"
                name="Total essays"
                value={data?.total_essays_count!.toString()}
              />

              <DisplayableUserProperty
                type="displayable"
                name="Average score"
                value={(Math.round(data?.average_band_score! * 2) / 2)
                  .toString()
                  .padEnd(3, ".0")}
              />

              <DisplayableUserProperty
                type="displayable"
                name="Total reactions left"
                value={data?.total_reactions_left!.toString()}
              />

              <DisplayableUserProperty
                type="displayable"
                name="Total comments left"
                value={data?.total_comments_left!.toString()}
              />
            </>
          )
        )}
      </VStack>
    </CardBox>
  );
}
