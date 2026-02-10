import useOpenEssay from "@/src/hooks/useOpenEssay";
import PrivacyType from "@/src/types/privacyType";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { Expand, Pencil } from "lucide-react-native";
import React from "react";

interface OpenEssayButtonProps {
  privacy: PrivacyType;
  essayId: number;
  userId: string;
}

cssInteropIcon(Pencil);
cssInteropIcon(Expand);

export default function OpenEssayButton({
  privacy,
  essayId,
  userId,
}: OpenEssayButtonProps) {
  const { openEssay } = useOpenEssay(privacy === "private", essayId, userId);

  const Icon = privacy === "private" ? Pencil : Expand;

  return (
    <IconButton
      action="secondary"
      className="bg-transparent"
      onPress={openEssay}
    >
      <Icon className="text-typography-950" size={20} />
    </IconButton>
  );
}
