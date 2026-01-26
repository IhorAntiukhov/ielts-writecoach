export default function getFileTypeFromMIME(mimeType?: string) {
  return mimeType?.slice(mimeType.indexOf("/") + 1) || "jpeg";
}
