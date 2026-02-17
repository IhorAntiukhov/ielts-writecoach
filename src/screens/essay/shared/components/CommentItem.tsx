import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Comment, deleteComment, updateComment } from "@/src/api/commentsRepo";
import EditDeleteButtons from "@/src/components/editDeleteButtons";
import PublishedDate from "@/src/components/publishedDate";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { ShowDialogParams } from "@/src/context/AlertDialogProvider";
import useToast from "@/src/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Text } from "react-native";
import UserAvatar from "./UserAvatar";

interface CommentProps {
  data: Comment;
  showDialog: (params: ShowDialogParams) => void;
}

export default function CommentItem({ data, showDialog }: CommentProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: updateCommentMutation, isPending: isUpdatePending } =
    useMutation({
      mutationFn: () => updateComment(newCommentText, data.id),
      onMutate: () => {
        setIsEditMode(false);
      },
      onSuccess: () => {
        setNewCommentText("");

        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey[0] === queryKeyPrefixes.comments &&
            queryKey[1] === data.essay_id,
        });
      },
      onError(error) {
        toast("error", "Failed to edit comment", error.message);
      },
    });

  const handleUpdateComment = () => {
    if (newCommentText) updateCommentMutation();
    else setIsEditMode(false);
  };

  const { mutate: deleteCommentMutation, isPending: isDeletionPending } =
    useMutation({
      mutationFn: () => deleteComment(data.id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey[0] === queryKeyPrefixes.comments &&
            queryKey[1] === data.essay_id,
        });
      },
      onError(error) {
        toast("error", "Failed to delete comment", error.message);
      },
    });

  const profile = data.profiles;

  return (
    <HStack space="md">
      <UserAvatar profile={profile} />

      <VStack space="lg" className="items-center">
        <VStack space="sm">
          <HStack space="lg" className="items-center justify-between">
            <HStack space="lg" className="items-center">
              <Text className="text-md text-typography-950">
                {profile.user_name}
              </Text>

              <PublishedDate createdAt={data.created_at} />
            </HStack>

            <EditDeleteButtons
              type="comment"
              onEdit={() => setIsEditMode(true)}
              onDelete={deleteCommentMutation}
              isEditCommentMode={isEditMode}
              updateComment={handleUpdateComment}
              showDialog={showDialog}
              isUpdatePending={isUpdatePending}
              isDeletionPending={isDeletionPending}
            />
          </HStack>

          {isEditMode ? (
            <Input variant="underlined" size="md">
              <InputField
                value={newCommentText}
                onChangeText={setNewCommentText}
                placeholder="Type new comment"
                defaultValue={data.text}
              />
            </Input>
          ) : (
            <Text className="text-lg text-typography-950">{data.text}</Text>
          )}
        </VStack>
      </VStack>
    </HStack>
  );
}
