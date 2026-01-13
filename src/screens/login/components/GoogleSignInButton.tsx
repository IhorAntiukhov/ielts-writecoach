import Google from "@/assets/images/google.svg";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import useToast from "@/src/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../api/auth";

export default function GoogleSignInButton() {
  const showToast = useToast();

  const { mutate: signInMutation, isPending } = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
      showToast("success", "Sign in", "Successfully logged in with Google");
    },
    onError(error) {
      showToast("error", "Sign in", error.message);
    },
  });

  return (
    <Button
      action="secondary"
      onPress={() => signInMutation()}
      disabled={isPending}
    >
      <ButtonIcon as={Google} />
      <ButtonText>Sign in with Google</ButtonText>
      {isPending && <ButtonSpinner color="white" />}
    </Button>
  );
}
