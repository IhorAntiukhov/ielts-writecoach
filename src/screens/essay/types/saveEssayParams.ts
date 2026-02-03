import EssayType from "@/src/types/essayType";

interface DatabaseImageData {
  uri: string;
  aspectRatio: number;
  mimeType: string;
}

export interface InsertEssayParams {
  type: EssayType;
  instructions: string;
  imageData?: DatabaseImageData;
  time?: number;
  wordCount: number;
  response: string;
  userId: string;
}

export interface InsertEssayWithAnalysisParams extends InsertEssayParams {
  base64?: string;
}

export type UpdateEssayParams = Omit<InsertEssayParams, "userId">;

export type UpdateEssayWithAnalysisParams = Omit<
  InsertEssayWithAnalysisParams,
  "userId"
>;
