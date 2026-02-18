import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export default function ProfileHeader({ children }: React.PropsWithChildren) {
  return (
    <View className="relative -mx-8 -mt-6">
      <Image
        source={require("@/assets/images/profile-cover.jpg")}
        className="w-full aspect-[5/2] rounded-lg"
        contentFit="cover"
      />
      {children}
    </View>
  );
}
