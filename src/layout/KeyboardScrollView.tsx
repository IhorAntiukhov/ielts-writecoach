import { cssInterop } from "nativewind";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const StyledKeyboardAwareScrollView = cssInterop(KeyboardAwareScrollView, {
  contentContainerClassName: "contentContainerStyle",
});

export default function KeyboardScrollView({
  children,
}: React.PropsWithChildren) {
  return (
    <StyledKeyboardAwareScrollView
      contentContainerClassName="flex-grow bg-background-50"
      keyboardShouldPersistTaps="always"
      bottomOffset={40}
    >
      {children}
    </StyledKeyboardAwareScrollView>
  );
}
