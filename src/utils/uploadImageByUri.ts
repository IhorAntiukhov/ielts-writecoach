import { getPublicUrl, uploadImage } from "../api/storage";
import getFileTypeFromMIME from "./getFileTypeFromMIME";

export default async function uploadImageByUri(
  uri: string,
  userId: string,
  bucket: string,
  name: string,
  mimeType?: string,
) {
  const response = await fetch(uri);

  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const path = `${userId}/${name}.${getFileTypeFromMIME(mimeType)}`;

  await uploadImage(bucket, path, arrayBuffer, mimeType || "image/jpeg", true);

  const publicUrl = await getPublicUrl(bucket, path);

  return publicUrl;
}
