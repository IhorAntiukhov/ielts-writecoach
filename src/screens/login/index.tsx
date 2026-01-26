import { gradientColors } from "@/components/ui/gluestack-ui-provider/config";
import { VStack } from "@/components/ui/vstack";
import Pager from "@/src/components/Pager";
import SegmentedButtons from "@/src/components/segmentedButtons";
import SignInForm from "@/src/screens/login/components/SignInForm";
import SignUpForm from "@/src/screens/login/components/SignUpForm";
import { cssInterop, useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Text } from "react-native";
import { GradientText } from "universal-gradient-text";

type Page = "sign-in" | "sign-up";

cssInterop(GradientText, {
  className: "style",
});

export default function LoginScreen() {
  const { colorScheme } = useColorScheme();
  const [page, setPage] = useState<Page>("sign-in");

  return (
    <VStack space="3xl">
      <SegmentedButtons<Page>
        buttons={[
          { title: "Sign in", pageName: "sign-in" },
          {
            title: "Sign up",
            pageName: "sign-up",
          },
        ]}
        currentPage={page}
        setPage={setPage}
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

      <Pager
        currentPage={page}
        pages={[
          {
            page: "sign-in",
            component: <SignInForm />,
          },
          {
            page: "sign-up",
            component: <SignUpForm />,
          },
        ]}
      />
    </VStack>
  );
}
