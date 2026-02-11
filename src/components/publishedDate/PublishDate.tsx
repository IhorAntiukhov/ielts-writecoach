import { Text } from "react-native";
import formatDate from "../../utils/formatDate";

interface PublishDateProps {
  createdAt: string;
}

export default function PublishDate({ createdAt }: PublishDateProps) {
  return (
    <Text className="text-typography-500 text-md">{formatDate(createdAt)}</Text>
  );
}
