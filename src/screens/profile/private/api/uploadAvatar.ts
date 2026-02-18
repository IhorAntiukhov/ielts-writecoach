import { changeUserProperties } from "@/src/api/auth";
import uploadImageByUri from "@/src/api/uploadImageByUri";
import selectImage from "@/src/utils/selectImage";

export default async function uploadAvatar(userId: string) {
  const image = await selectImage([1, 1], 0.7);

  const avatarUrl = await uploadImageByUri({
    uri: image.uri,
    bucket: "avatars",
    fileName: "avatar",
    userId,
    mimeType: image.mimeType,
  });

  await changeUserProperties({ avatarUrl });

  return image.uri;
}
