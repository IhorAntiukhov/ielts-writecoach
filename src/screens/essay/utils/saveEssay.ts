import { insertEssay, updateEssay } from "@/src/api/essaysRepo";
import uploadImageByUri from "@/src/utils/uploadImageByUri";
import { InsertEssayParams, UpdateEssayParams } from "../types/saveEssayParams";

export async function uploadNewEssay(data: InsertEssayParams) {
  const { id: essayId } = await insertEssay(data);

  if (data.image && data.mimeType) {
    const imageUrl = await uploadImageByUri(
      data.image,
      data.userId,
      "essay_images",
      essayId.toString(),
      data.mimeType,
    );

    await updateEssay(essayId, {
      image: imageUrl,
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

  if (data.image && data.mimeType) {
    imageUrl = await uploadImageByUri(
      data.image,
      userId,
      "essay_images",
      essayId.toString(),
      data.mimeType,
    );
  }

  await updateEssay(essayId, {
    ...data,
    image: imageUrl,
  });
}
