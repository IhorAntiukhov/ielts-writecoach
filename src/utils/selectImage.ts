import * as ImagePicker from "expo-image-picker";

export default async function selectImage(
  aspect?: [number, number],
  quality?: number,
) {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    throw new Error("Permission to access the media library is required.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: aspect,
    quality: quality,
  });
  const image = result.assets?.[0];

  if (!image) throw new Error("Image was not selected");

  return image;
}
