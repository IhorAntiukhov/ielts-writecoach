import getEssayWithImageData from "@/src/screens/essay/private/api/getEssayWithImageData";
import { getPublicEssay } from "..";

export type FullPublicEssay = Awaited<ReturnType<typeof getPublicEssay>>;
export type FullPrivateEssay = Awaited<
  ReturnType<typeof getEssayWithImageData>
>;
