import * as zod from "zod";

export interface WritingFormData {
  type: string;
  task: string;
  image?: string;
  response: string;
}

const zodObject = {};

export const signInFormSchema = zod.object(zodObject);
