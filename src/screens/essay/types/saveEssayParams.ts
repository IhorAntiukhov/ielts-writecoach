import EssayType from "@/src/types/essayType";

export interface InsertEssayParams {
  type: EssayType;
  instructions: string;
  image?: string;
  mimeType?: string;
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
