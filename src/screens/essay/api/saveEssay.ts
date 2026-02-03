import { insertEssay, updateEssay } from "@/src/api/essaysRepo";
import uploadImageByUri from "@/src/api/uploadImageByUri";
import { Image } from "react-native";
import { InsertEssayParams, UpdateEssayParams } from "../types/saveEssayParams";

export async function uploadNewEssay(data: InsertEssayParams) {
  const { id: essayId } = await insertEssay(data);

  if (data.imageUrl && data.imageWidth && data.imageHeight) {
    const imageUrl = await uploadImageByUri({
      uri: data.imageUrl,
      bucket: "essay_images",
      fileName: essayId.toString(),
      userId: data.userId,
      mimeType: data.mimeType,
    });

    const { width, height } = await Image.getSize(imageUrl);

    await updateEssay(essayId, {
      imageUrl,
      imageWidth: width,
      imageHeight: height,
    });
  }

  return essayId;
}

export async function saveExistingEssay(
  data: UpdateEssayParams,
  essayId: number,
  userId: string,
) {
  let imageUrl: string | undefined;
  let width = data.imageWidth;
  let height = data.imageHeight;

  if (data.imageUrl && data.imageWidth && data.imageHeight) {
    imageUrl = await uploadImageByUri({
      uri: data.imageUrl,
      bucket: "essay_images",
      fileName: essayId.toString(),
      userId: userId,
      mimeType: data.mimeType,
    });

    const size = await Image.getSize(imageUrl);
    width = size.width;
    height = size.height;
  }

  await updateEssay(essayId, {
    ...data,
    imageUrl,
    imageWidth: width,
    imageHeight: height,
  });
}
