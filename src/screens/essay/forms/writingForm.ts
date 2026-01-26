import formErrorMessages from "@/src/forms/formErrorMessages";
import * as zod from "zod";

export interface WritingFormData {
  instructions: string;
  response: string;
}

export const writingFormSchema = zod.object({
  instructions: zod
    .string(formErrorMessages.fieldRequired)
    .nonempty(formErrorMessages.fieldRequired),
  response: zod
    .string(formErrorMessages.fieldRequired)
    .nonempty(formErrorMessages.fieldRequired),
});
