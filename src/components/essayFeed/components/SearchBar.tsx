import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import EssayFeedContext from "@/src/screens/private/context/EssayFeedContext";
import { Search, X } from "lucide-react-native";
import { use } from "react";

export default function SearchBar() {
  const { searchPrompt, setSearchPrompt } = use(EssayFeedContext)!;

  const handleClear = () => {
    setSearchPrompt("");
  };

  return (
    <Input variant="rounded" size="md">
      <InputSlot className="pl-3">
        <InputIcon as={Search} />
      </InputSlot>
      <InputField
        onChangeText={setSearchPrompt}
        value={searchPrompt}
        placeholder="Search for essays..."
        keyboardType="default"
        returnKeyType="search"
      />
      <InputSlot className="pr-3" onPress={handleClear}>
        <InputIcon as={X} />
      </InputSlot>
    </Input>
  );
}
