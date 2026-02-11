import { updateEssayPrivacy } from "@/src/api/essaysRepo";
import PopoverButton from "@/src/ui/button/PopoverButton";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import { useMutation } from "@tanstack/react-query";
import { Users } from "lucide-react-native";

interface UpdateEssayPrivacyButtonProps {
  id: string | string[];
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateEssayPrivacyButton({
  id,
  isPublic,
  setIsPublic,
}: UpdateEssayPrivacyButtonProps) {
  const {
    mutate: updateEssayPrivacyMutation,
    isPending: isUpdateEssayPrivacyMutationPending,
  } = useMutation({
    mutationFn: (isPublic: boolean) =>
      updateEssayPrivacy(Number(id as string), isPublic),
    onSuccess: (data) => {
      setIsPublic(data);
    },
  });

  const handleUpdateEssayPrivacy = () => {
    updateEssayPrivacyMutation(!isPublic);
  };

  return id === "new-essay" ? (
    <PopoverButton
      icon={Users}
      buttonTitle="Share with others"
      placement="top"
      popoverContent="You must save your essay before making it public"
    />
  ) : (
    <SecondaryButton
      icon={Users}
      isLoading={isUpdateEssayPrivacyMutationPending}
      onPress={handleUpdateEssayPrivacy}
    >
      {isPublic ? "Make essay private" : "Share with others"}
    </SecondaryButton>
  );
}
