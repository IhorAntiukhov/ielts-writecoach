import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import EssayFeedContext from "@/src/components/essayFeed/context/EssayFeedContext";
import { Search, X } from "lucide-react-native";
import { use, useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const [text, setText] = useState("");
  const timeoutId = useRef<number | undefined>(null);

  const { setSearchPrompt } = use(EssayFeedContext)!;

  useEffect(() => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      setSearchPrompt(text);
    }, 500);

    return () => clearTimeout(timeoutId.current ?? undefined);
  }, [text, setSearchPrompt]);

  const handleClear = () => {
    setText("");
    setSearchPrompt("");
  };

  return (
    <Input variant="rounded" size="md">
      <InputSlot className="pl-3">
        <InputIcon as={Search} />
      </InputSlot>
      <InputField
        onChangeText={setText}
        value={text}
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
