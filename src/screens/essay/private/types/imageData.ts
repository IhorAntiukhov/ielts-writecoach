type ImageData = {
  uri: string;
  imageDimensions: {
    width: number;
    height: number;
  };
  mimeType: string;
  base64: string;
} | null;

export default ImageData;
