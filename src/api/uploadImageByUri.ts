import getFileTypeFromMIME from "../utils/getFileTypeFromMIME";
import { getPublicUrl, uploadImage } from "./storage";

interface UploadImageByUriParams {
  uri: string;
  bucket: string;
  fileName: string;
  userId: string;
  mimeType?: string;
}

export default async function uploadImageByUri({
  uri,
  bucket,
  fileName,
  userId,
  mimeType,
}: UploadImageByUriParams) {
  const response = await fetch(uri);

  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const path = `${userId}/${fileName}.${getFileTypeFromMIME(mimeType)}`;

  await uploadImage(bucket, path, arrayBuffer, mimeType || "image/jpeg", true);

  const publicUrl = await getPublicUrl(bucket, path);

  return publicUrl;
}
