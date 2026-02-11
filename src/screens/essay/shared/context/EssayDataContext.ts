import {
  FullPrivateEssay,
  FullPublicEssay,
} from "@/src/api/essaysRepo/types/fullEssayTypes";
import { createContext } from "react";

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
}

type EssayDataContextProps =
  | PublicEssayDataContextProps
  | PrivateEssayDataContextProps
  | null;

const EssayDataContext = createContext<EssayDataContextProps>(null);

export default EssayDataContext;
