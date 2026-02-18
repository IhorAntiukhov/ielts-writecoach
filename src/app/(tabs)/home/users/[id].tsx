import KeyboardScrollView from "@/src/layout/KeyboardScrollView";
import PublicUserScreen from "@/src/screens/profile/public";
import React from "react";

export default function UserScreen() {
  return (
    <KeyboardScrollView>
      <PublicUserScreen />
    </KeyboardScrollView>
  );
}
