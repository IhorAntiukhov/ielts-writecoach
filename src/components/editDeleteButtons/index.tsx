import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialogContext,
  ShowDialogParams,
} from "@/src/context/AlertDialogProvider";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { Check, Pencil, Trash } from "lucide-react-native";
import { use } from "react";

cssInteropIcon(Check);
cssInteropIcon(Pencil);
cssInteropIcon(Trash);

interface BaseEditDeleteButtonsProps {
  onEdit: () => any;
  onDelete: () => any;
  isDeletionPending: boolean;
}

interface EssayEditDeleteButtonsProps extends BaseEditDeleteButtonsProps {
  type: "essay";
}

interface CommentEditDeleteButtonsProps extends BaseEditDeleteButtonsProps {
  type: "comment";
  isEditCommentMode: boolean;
  updateComment: () => any;
  showDialog: (params: ShowDialogParams) => void;
  isUpdatePending: boolean;
}

type EditDeleteButtonsProps =
  | EssayEditDeleteButtonsProps
  | CommentEditDeleteButtonsProps;

export default function EditDeleteButtons(props: EditDeleteButtonsProps) {
  const showDialog =
    props.type === "essay"
      ? use(AlertDialogContext)?.showDialog
      : props.showDialog;

  const handleDeleteEssay = () => {
    showDialog?.({
      title: `Delete ${props.type}`,
      content: `Are you sure you want to delete this ${props.type}?`,
      onConfirm() {
        props.onDelete();
      },
    });
  };

  const handleFirstIconPress = () => {
    if (props.type === "comment" && props.isEditCommentMode)
      props.updateComment();
    else props.onEdit();
  };

  const FirstIcon =
    props.type === "comment" && props.isEditCommentMode ? Check : Pencil;

  return (
    <HStack space="sm" className="-mr-2">
      {props.type === "comment" && props.isUpdatePending ? (
        <Spinner className="text-typography-950" size={24} />
      ) : (
        <IconButton
          action="secondary"
          className="bg-transparent"
          onPress={handleFirstIconPress}
        >
          <FirstIcon className="text-typography-950" size={20} />
        </IconButton>
      )}

      {props.isDeletionPending ? (
        <Spinner className="text-typography-950" size={24} />
      ) : (
        <IconButton
          action="secondary"
          className="bg-transparent"
          onPress={handleDeleteEssay}
        >
          <Trash className="text-typography-950" size={20} />
        </IconButton>
      )}
    </HStack>
  );
}
