import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PrivateFeedEssay } from "@/src/api/essaysRepo/types/feedEssayTypes";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import useOpenEssay from "@/src/hooks/useOpenEssay";
import useToast from "@/src/hooks/useToast";
import CardBox from "@/src/ui/CardBox";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react-native";
import { Text, View } from "react-native";
import EditDeleteButtons from "../../editDeleteButtons";
import PublishedDate from "../../publishedDate";
import deleteEssayWithImage from "../api/deleteEssay";
import EssayBaseCard from "./EssayBaseCard";

cssInteropIcon(Eye);

interface PrivateEssayCardProps {
  data: PrivateFeedEssay;
}

export default function PrivateEssayCard({ data }: PrivateEssayCardProps) {
  const queryClient = useQueryClient();

  const showToast = useToast();

  const { mutate: deleteEssayMutation, isPending: isDeletionPending } =
    useMutation({
      mutationFn: () =>
        deleteEssayWithImage(data.id!, data.image_url ?? undefined),
      onError: (error) => {
        showToast("error", "Failed to delete essay", error.message);
      },
      onSuccess: () => {
        showToast("success", "Delete essay", "Essay was successfully deleted");

        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey[0] === queryKeyPrefixes.privateFeed,
        });
      },
    });

  const { openEssay } = useOpenEssay(true, data.id!, data.user_id!);

  return (
    <CardBox>
      <VStack space="lg">
        <HStack space="sm" className="items-center justify-between">
          <VStack space="md">
            {data.is_public && (
              <View className="px-3 py-0.5 rounded-full bg-green-600">
                <HStack space="sm" className="items-center">
                  <Eye className="text-typography-white" size={20} />
                  <Text className="text-typography-white">Public</Text>
                </HStack>
              </View>
            )}

            <PublishedDate createdAt={data.created_at!} />
          </VStack>

          <EditDeleteButtons
            type="essay"
            onEdit={openEssay}
            onDelete={deleteEssayMutation}
            isDeletionPending={isDeletionPending}
          />
        </HStack>

        <EssayBaseCard type="private" data={data} />
      </VStack>
    </CardBox>
  );
}
