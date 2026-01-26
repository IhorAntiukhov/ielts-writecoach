import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "@/components/ui/popover";
import { LucideIcon } from "lucide-react-native";
import { useState } from "react";
import { Text } from "react-native";
import SecondaryButton from "./SecondaryButton";

interface PopoverButtonProps {
  icon: LucideIcon;
  buttonTitle: string;
  placement?: "top" | "bottom";
  popoverContent: string;
}

export default function PopoverButton({
  icon,
  buttonTitle,
  placement,
  popoverContent,
}: PopoverButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement={placement || "bottom"}
      size="sm"
      offset={5}
      trigger={(triggerProps) => {
        return (
          <SecondaryButton icon={icon} {...triggerProps}>
            {buttonTitle}
          </SecondaryButton>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text className="text-typography-950">{popoverContent}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
