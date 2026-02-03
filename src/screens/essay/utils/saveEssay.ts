import { insertEssay, updateEssay } from "@/src/api/essaysRepo";
import uploadImageByUri from "@/src/utils/uploadImageByUri";
import { InsertEssayParams, UpdateEssayParams } from "../types/saveEssayParams";

export async function uploadNewEssay(data: InsertEssayParams) {
  const { id: essayId } = await insertEssay(data);

  if (data.imageData) {
    const imageUrl = await uploadImageByUri(
      data.imageData.uri,
      data.userId,
      "essay_images",
      essayId.toString(),
      data.imageData.mimeType,
    );

    await updateEssay(essayId, {
      imageData: {
        uri: imageUrl,
        aspectRatio: data.imageData.aspectRatio,
        mimeType: data.imageData.mimeType,
      },
    });
  }

  return essayId;
}

export async function saveExistingEssay(
  data: UpdateEssayParams,
  essayId: number,
  userId: string,
) {
  let imageUrl: string | undefined = undefined;

  if (data.imageData) {
    imageUrl = await uploadImageByUri(
      data.imageData.uri,
      userId,
      "essay_images",
      essayId.toString(),
      data.imageData.mimeType,
    );
  }

  await updateEssay(essayId, {
    ...data,
    imageData:
      imageUrl && data.imageData
        ? {
            uri: imageUrl,
            aspectRatio: data.imageData.aspectRatio,
            mimeType: data.imageData.mimeType,
          }
        : undefined,
  });
}
