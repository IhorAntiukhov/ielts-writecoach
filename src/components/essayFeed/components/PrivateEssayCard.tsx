import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PrivateEssay } from "@/src/api/essaysRepo/types/feedEssayTypes";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AlertDialogContext } from "@/src/context/AlertDialogProvider";
import useOpenEssay from "@/src/hooks/useOpenEssay";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import CardBox from "@/src/ui/CardBox";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Pencil, Trash } from "lucide-react-native";
import { use } from "react";
import { Text, View } from "react-native";
import PublishedDate from "../../publishedDate";
import deleteEssayWithImage from "../api/deleteEssay";
import EssayBaseCard from "./EssayBaseCard";

cssInteropIcon(Eye);
cssInteropIcon(Pencil);
cssInteropIcon(Trash);

interface PrivateEssayCardProps {
  data: PrivateEssay;
}

export default function PrivateEssayCard({ data }: PrivateEssayCardProps) {
  const queryClient = useQueryClient();

  const { showDialog } = use(AlertDialogContext)!;
  const showToast = useToast();

  const { mutate: deleteEssayMutation } = useMutation({
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

  const handleDeleteEssay = () => {
    showDialog({
      title: "Delete essay",
      content: "Are you sure you want to delete this essay?",
      onConfirm() {
        deleteEssayMutation();
      },
    });
  };

  return (
    <CardBox>
      <VStack space="lg">
        <HStack space="sm" className="items-center justify-between">
          <VStack space="md">
            {
              <View className="px-3 py-0.5 rounded-full bg-green-600">
                <HStack space="sm" className="items-center">
                  <Eye className="text-typography-white" size={20} />
                  <Text className="text-typography-white">Public</Text>
                </HStack>
              </View>
            }

            <PublishedDate createdAt={data.created_at!} />
          </VStack>

          <HStack space="sm" className="-mr-2">
            <IconButton
              action="secondary"
              className="bg-transparent"
              onPress={openEssay}
            >
              <Pencil className="text-typography-950" size={20} />
            </IconButton>

            <IconButton
              action="secondary"
              className="bg-transparent"
              onPress={handleDeleteEssay}
            >
              <Trash className="text-typography-950" size={20} />
            </IconButton>
          </HStack>
        </HStack>

        <EssayBaseCard type="private" data={data} />
      </VStack>
    </CardBox>
  );
}
