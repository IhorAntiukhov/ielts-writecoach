import { changeUserProperties } from "@/src/api/auth";
import { getPublicUrl, uploadImage } from "@/src/api/storage";
import getFileTypeFromMIME from "@/src/utils/getFileTypeFromMIME";
import selectImage from "@/src/utils/selectImage";

export default async function uploadAvatar(userId: string) {
  const image = await selectImage([1, 1], 0.7);

  const response = await fetch(image.uri);

  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const path = `${userId}/avatar.${getFileTypeFromMIME(image.mimeType)}`;

  uploadImage(
    "avatars",
    path,
    arrayBuffer,
    image.mimeType || "image/jpeg",
    true,
  );

  const avatarUrl = await getPublicUrl("avatars", path);

  await changeUserProperties({ avatarUrl });

  return image.uri;
}
