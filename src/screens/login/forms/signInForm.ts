import * as zod from "zod";
import formErrorMessages from "../constants/formErrorMessages";

export interface SignInFormData {
  email: string;
  password: string;
}

export const signInFormSchema = zod.object({
  email: zod.email({
    error: (issue) =>
      !issue.input
        ? formErrorMessages.fieldRequired
        : formErrorMessages.invalidEmail,
  }),
  password: zod
    .string(formErrorMessages.fieldRequired)
    .nonempty(formErrorMessages.fieldRequired)
    .min(6, formErrorMessages.passwordTooShort),
});
