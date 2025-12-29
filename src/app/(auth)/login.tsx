import LoginScreen from "@/src/screens/login";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Login() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="always"
    >
      <LoginScreen />
    </KeyboardAwareScrollView>
  );
}
