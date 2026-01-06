import { Button, ButtonText } from "@/components/ui/button";
import supabase from "@/src/api/supabase";
import React from "react";

export default function TabLayout() {
  return (
    <Button onPress={() => supabase.auth.signOut()}>
      <ButtonText>Logout</ButtonText>
    </Button>
  );
}
