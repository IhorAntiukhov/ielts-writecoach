import { getEssay } from "@/src/api/essaysRepo";

export default async function getEssayWithImageData(id: number) {
  const data = await getEssay(id);

  let mimeType = "image/jpeg";
  let base64 = "";

  if (data.image_url) {
    const response = await fetch(data.image_url);
    const blob = await response.blob();
    mimeType = blob.type;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;

      if (!result) return;

      base64 = (result as string).substring(
        (result as string).indexOf(",") + 1,
      );
    };
    reader.readAsDataURL(blob);
  }

  return {
    ...data,
    mimeType,
    base64,
  };
}
