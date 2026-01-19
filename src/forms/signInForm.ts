import * as zod from "zod";
import formErrorMessages from "./formErrorMessages";

export interface SignInFormData {
  email: string;
  password: string;
}

export interface EmailFormData {
  email: string;
}

const zodObject = {
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
};

export const signInFormSchema = zod.object(zodObject);

export const emailFormSchema = zod.object({ email: zodObject.email });
