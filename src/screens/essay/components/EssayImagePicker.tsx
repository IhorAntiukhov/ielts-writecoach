import { VStack } from "@/components/ui/vstack";
import useToast from "@/src/hooks/useToast";
import IconButton from "@/src/ui/button/IconButton";
import IndicatorText from "@/src/ui/IndicatorText";
import SmallCardBox from "@/src/ui/SmallCardBox";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import selectImage from "@/src/utils/selectImage";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { ImageIcon, X } from "lucide-react-native";
import { Pressable } from "react-native";
import ImageData from "../types/imageData";

cssInteropIcon(ImageIcon);
cssInteropIcon(X);

interface EssayImagePickerProps {
  imageData: ImageData;
  setImageData: React.Dispatch<React.SetStateAction<ImageData>>;
}

export default function EssayImagePicker({
  imageData,
  setImageData,
}: EssayImagePickerProps) {
  const toast = useToast();

  const { mutate: handleSelectImage } = useMutation({
    mutationFn: () => selectImage(undefined, undefined, true),
    onSuccess: ({ uri, mimeType, base64, width, height }) => {
      setImageData({
        uri,
        aspectRatio: width / height,
        mimeType: mimeType || "image/jpeg",
        base64: base64 || "",
      });
    },
    onError: (error) => {
      toast("error", "Select image", error.message);
    },
  });

  const clearImage = () => {
    setImageData(null);
  };

  return (
    <Pressable onPress={() => handleSelectImage()} className="relative">
      {imageData ? (
        <>
          <Image
            source={{ uri: imageData.uri }}
            className="w-full rounded-lg border border-y border-outline-300"
            style={{
              aspectRatio: imageData.aspectRatio,
            }}
            contentFit="contain"
          />

          <IconButton
            action="secondary"
            className="absolute bottom-2 right-2 bg-black/50"
            onPress={clearImage}
          >
            <X className="text-typography-950" />
          </IconButton>
        </>
      ) : (
        <SmallCardBox className="py-0 px-0 aspect-video">
          <VStack className="items-center" space="sm">
            <ImageIcon className="w-12 h-12 text-typography-500" />

            <IndicatorText className="font-bold">
              Select the task image
            </IndicatorText>
          </VStack>
        </SmallCardBox>
      )}
    </Pressable>
  );
}
