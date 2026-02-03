import { getEssay } from "@/src/api/essaysRepo";

export default async function getEssayWithImageData(id: number) {
  const data = await getEssay(id);

  if (data.image_url) {
    const response = await fetch(data.image_url);
    const blob = await response.blob();
    const mimeType = blob.type;
    let base64 = "";

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;

      if (!result) return;

      base64 = (result as string).substring(
        (result as string).indexOf(",") + 1,
      );
    };
    reader.readAsDataURL(blob);

    return {
      ...data,
      imageData: {
        uri: data.image_url,
        aspectRatio: data.image_aspect_ratio || 1920 / 1080,
        mimeType,
        base64,
      },
    };
  }

  return { ...data, imageData: undefined };
}
