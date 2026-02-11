import formatDate from "@/src/utils/formatDate";
import { Text } from "react-native";

interface PublishedDateProps {
  createdAt: string;
}

export default function PublishedDate({ createdAt }: PublishedDateProps) {
  return (
    <Text className="text-typography-500 text-md">{formatDate(createdAt)}</Text>
  );
}
