import { changeUserProperties } from "@/src/api/auth";
import { getPublicUrl, uploadImage } from "@/src/api/storage";
import * as ImagePicker from "expo-image-picker";

export default async function uploadAvatar(userId: string) {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    throw new Error("Permission to access the media library is required.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });
  const image = result.assets?.[0];

  if (!image) throw new Error("Image was not selected");

  const response = await fetch(image.uri);

  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const path = `${userId}/avatar.${blob.type.slice(blob.type.indexOf("/") + 1) || "jpeg"}`;

  uploadImage(path, arrayBuffer, image.mimeType, true);

  const avatarUrl = await getPublicUrl(path);

  await changeUserProperties({ avatarUrl });

  return image.uri;
}
