import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import IconButton from "@/src/ui/button/IconButton";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { Pencil } from "lucide-react-native";
import { Text } from "react-native";

interface UserPropertyProps {
  name: string;
  value: string;
}

const EditIcon = cssInteropIcon(Pencil);

export default function UserProperty({ name, value }: UserPropertyProps) {
  return (
    <HStack className="items-center justify-between">
      <VStack space="xs">
        <Text className="text-typography-500">{name}</Text>
        <Text className="text-typography-950">{value}</Text>
      </VStack>

      <IconButton action="secondary" className="bg-transparent">
        <EditIcon className="text-typography-950 text-xl" />
      </IconButton>
    </HStack>
  );
}
