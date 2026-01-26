import { insertEssay, updateEssay } from "@/src/api/essaysRepo";
import { getPublicUrl, uploadImage } from "@/src/api/storage";
import getFileTypeFromMIME from "@/src/utils/getFileTypeFromMIME";
import { InsertEssayParams } from "../types/saveEssayParams";

export default async function uploadEssayWithImage(data: InsertEssayParams) {
  const { id: essayId } = await insertEssay(data);

  if (data.image && data.mimeType) {
    const response = await fetch(data.image);

    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();

    const path = `${data.userId}/essay${essayId}.${getFileTypeFromMIME(data.mimeType)}`;
    await uploadImage("essay_images", path, arrayBuffer, data.mimeType, true);

    const imageUrl = await getPublicUrl("essay_images", path);

    updateEssay(essayId, {
      image: imageUrl,
    });
  }

  return essayId;
}
