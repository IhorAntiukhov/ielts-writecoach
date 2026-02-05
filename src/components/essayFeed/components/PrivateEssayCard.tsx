import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PrivateEssay } from "@/src/api/essaysRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AlertDialogContext } from "@/src/context/AlertDialogProvider";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import CardBox from "@/src/ui/CardBox";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import formatDate from "@/src/utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Pencil, Trash } from "lucide-react-native";
import { use } from "react";
import { Text } from "react-native";
import deleteEssayWithImage from "../api/deleteEssay";
import EssayBaseCard from "./EssayBaseCard";

cssInteropIcon(Pencil);
cssInteropIcon(Trash);

interface PrivateEssayCardProps {
  data: PrivateEssay;
}

export default function PrivateEssayCard({ data }: PrivateEssayCardProps) {
  const queryClient = useQueryClient();

  const router = useRouter();

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

  const handleOpenEssay = () => {
    router.push({
      pathname: "/(tabs)/private/[id]",
      params: {
        id: data.id!.toString(),
      },
    });
  };

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
          {data.created_at && (
            <Text className="text-typography-500 text-md">
              {formatDate(data.created_at)}
            </Text>
          )}

          <HStack space="sm" className="-mr-2">
            <IconButton
              action="secondary"
              className="bg-transparent"
              onPress={handleOpenEssay}
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
