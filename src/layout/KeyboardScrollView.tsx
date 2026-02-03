import { cssInterop } from "nativewind";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

cssInterop(KeyboardAwareScrollView, {
  contentContainerClassName: "contentContainerStyle",
  className: "style",
});

export default function KeyboardScrollView({
  children,
}: React.PropsWithChildren) {
  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow bg-background-50"
      className="bg-secondary-300"
      keyboardShouldPersistTaps="always"
      bottomOffset={40}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
