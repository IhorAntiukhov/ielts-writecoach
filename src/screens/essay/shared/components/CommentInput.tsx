import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { insertComment } from "@/src/api/commentsRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendHorizonal } from "lucide-react-native";
import { useState } from "react";

cssInteropIcon(SendHorizonal);

interface CommentInputProps {
  essayId: number;
  userId: string;
}

export default function CommentInput({ essayId, userId }: CommentInputProps) {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate: addCommentMutation, isPending } = useMutation({
    mutationFn: () => insertComment(text, essayId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryKeyPrefixes.comments && queryKey[1] === essayId,
      });
    },
    onError(error) {
      toast("error", "Failed to add comment", error.message);
    },
  });

  return (
    <Textarea className="flex flex-col bg-background-50 rounded-lg p-1.5">
      <TextareaInput
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder="Write a new comment..."
      />

      <IconButton
        action="primary"
        className="self-end"
        onPress={() => addCommentMutation()}
        disabled={isPending}
      >
        <SendHorizonal className="text-white" size={20} />
      </IconButton>
    </Textarea>
  );
}
