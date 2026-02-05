import { deleteEssay } from "@/src/api/essaysRepo";
import { deleteImage } from "@/src/api/storage";

export default async function deleteEssayWithImage(
  id: number,
  imageUrl?: string,
) {
  if (imageUrl && !imageUrl.startsWith("file:")) {
    const imagePath = imageUrl.slice(imageUrl.indexOf("essay_images/") + 14);
    console.log("deleteee", imageUrl, imagePath);

    await deleteImage("essay_images", imagePath);
  }

  await deleteEssay(id);
}
