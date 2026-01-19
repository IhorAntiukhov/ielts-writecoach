import KeyboardScrollView from "@/src/layout/KeyboardScrollView";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <KeyboardScrollView>
      <Container>
        <CardBox>
          <Slot />
        </CardBox>
      </Container>
    </KeyboardScrollView>
  );
}
