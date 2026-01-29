import { changeUserProperties } from "@/src/api/auth";
import selectImage from "@/src/utils/selectImage";
import uploadImageByUri from "@/src/utils/uploadImageByUri";

export default async function uploadAvatar(userId: string) {
  const image = await selectImage([1, 1], 0.7);

  const avatarUrl = await uploadImageByUri(
    image.uri,
    userId,
    "avatars",
    "avatar",
    image.mimeType,
  );

  await changeUserProperties({ avatarUrl });

  return image.uri;
}
