import { gradientColors } from "@/components/ui/gluestack-ui-provider/config";
import { VStack } from "@/components/ui/vstack";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import SegmentedButtons from "@/src/ui/segmentedButtons";
import { cssInterop, useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Text } from "react-native";
import { GradientText } from "universal-gradient-text";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

cssInterop(GradientText, {
  className: "style",
});

enum SelectedMode {
  signIn,
  signUp,
  forgotPassword,
}

export default function LoginScreen() {
  const [selectedMode, setSelectedMode] = useState<SelectedMode>(
    SelectedMode.signIn,
  );
  const { colorScheme } = useColorScheme();

  return (
    <Container>
      <CardBox>
        <VStack space="3xl">
          {selectedMode !== SelectedMode.forgotPassword && (
            <>
              <SegmentedButtons
                value={selectedMode}
                onChange={setSelectedMode}
                buttons={["Sign in", "Sign up"]}
              />

              <VStack>
                <GradientText
                  colors={[
                    `rgb(${gradientColors.start[colorScheme || "light"]})`,
                    `rgb(${gradientColors.end[colorScheme || "light"]})`,
                  ]}
                  className="text-3xl text-center font-bold"
                >
                  IELTS WriteCoach
                </GradientText>
                <Text className="text-lg text-center text-typography-500">
                  Write. Review. Improve. Repeat.
                </Text>
              </VStack>

              {selectedMode === SelectedMode.signIn && (
                <SignInForm
                  openForgotPasswordForm={() =>
                    setSelectedMode(SelectedMode.forgotPassword)
                  }
                />
              )}
              {selectedMode === SelectedMode.signUp && <SignUpForm />}
            </>
          )}

          {selectedMode === SelectedMode.forgotPassword && (
            <ForgotPasswordForm
              openSignInForm={() => setSelectedMode(SelectedMode.signIn)}
            />
          )}
        </VStack>
      </CardBox>
    </Container>
  );
}
