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

export type UpdateEssayParams = Partial<Omit<InsertEssayParams, "userId">>;
