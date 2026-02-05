import EssayType from "@/src/types/essayType";
import { useEffect, useRef } from "react";
import { UseFormReset } from "react-hook-form";
import getEssayWithImageData from "../api/getEssayWithImageData";
import { WritingFormData } from "../forms/writingForm";
import ImageData from "../types/imageData";

interface UseSetFormDataParams {
  data: Awaited<ReturnType<typeof getEssayWithImageData>> | undefined;
  reset: UseFormReset<WritingFormData>;
  setType: React.Dispatch<React.SetStateAction<EssayType>>;
  setSecondsFromStart: React.Dispatch<React.SetStateAction<number>>;
  setImageData: React.Dispatch<React.SetStateAction<ImageData>>;
}

export default function useSetFormData({
  data,
  reset,
  setType,
  setSecondsFromStart,
  setImageData,
}: UseSetFormDataParams) {
  const isInitialDataSetRef = useRef(false);

  useEffect(() => {
    const setData = async () => {
      if (data && !isInitialDataSetRef.current) {
        reset({
          instructions: data.instructions,
          response: data.response,
        });
        setType(data.type);
        setSecondsFromStart(data.time || 0);

        if (data.image_url) {
          setImageData({
            uri: data.image_url,
            imageDimensions: {
              width: data.image_width || 1920,
              height: data.image_height || 1080,
            },
            mimeType: data.mimeType,
            base64: data.base64,
          });
        }

        isInitialDataSetRef.current = true;
      }
    };

    setData();
  }, [data, reset, setType, setSecondsFromStart, setImageData]);
}
