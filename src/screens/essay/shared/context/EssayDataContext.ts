import {
  FullPrivateEssay,
  FullPublicEssay,
} from "@/src/api/essaysRepo/types/fullEssayTypes";
import { createContext } from "react";
import ImageData from "../../private/types/imageData";

interface BaseEssayDataContextProps {
  error: Error | null;
  isPending: boolean;
  isError: boolean;
}

interface PublicEssayDataContextProps extends BaseEssayDataContextProps {
  type: "public";
  data: FullPublicEssay | undefined;
}

interface PrivateEssayDataContextProps extends BaseEssayDataContextProps {
  type: "private";
  data: FullPrivateEssay | undefined;
  imageData: ImageData;
  setImageData: React.Dispatch<React.SetStateAction<ImageData>>;
}

type EssayDataContextProps =
  | PublicEssayDataContextProps
  | PrivateEssayDataContextProps
  | null;

const EssayDataContext = createContext<EssayDataContextProps>(null);

export default EssayDataContext;
