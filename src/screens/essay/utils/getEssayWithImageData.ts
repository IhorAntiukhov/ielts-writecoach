import { getEssay } from "@/src/api/essaysRepo";
import { Image } from "react-native";

export default async function getEssayWithImageData(id: number) {
  const data = await getEssay(id);

  if (data.image) {
    const response = await fetch(data.image);
    const blob = await response.blob();
    const mimeType = blob.type;
    let base64 = "";

    const { width, height } = await Image.getSize(data.image);

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
        uri: data.image,
        mimeType,
        base64,
      },
      imageDimensions: {
        width,
        height,
      },
    };
  }

  return { ...data, imageData: undefined, imageDimensions: undefined };
}
