import { gradientColors } from "@/components/ui/gluestack-ui-provider/config";
import { VStack } from "@/components/ui/vstack";
import SegmentedButtons from "@/src/components/segmentedButtons";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { cssInterop, useColorScheme } from "nativewind";
import React from "react";
import { Text } from "react-native";
import { Screen } from "react-native-screens";
import { GradientText } from "universal-gradient-text";

cssInterop(GradientText, { className: "style" });

export default function LoginLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs>
      <TabList>
        <TabTrigger name="sign-in" href="/(auth)/login" />
        <TabTrigger name="sign-up" href="/(auth)/login/sign-up" />
      </TabList>

      <VStack space="3xl">
        <SegmentedButtons
          buttons={[
            { title: "Sign in", name: "sign-in", href: "/(auth)/login" },
            {
              title: "Sign up",
              name: "sign-up",
              href: "/(auth)/login/sign-up",
            },
          ]}
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

        <TabSlot
          className="grow-0 shrink-1"
          detachInactiveScreens
          renderFn={(descriptor, { isFocused, loaded }) => {
            if (!loaded || !isFocused) return null;

            return <Screen>{descriptor.render()}</Screen>;
          }}
        />
      </VStack>
    </Tabs>
  );
}
