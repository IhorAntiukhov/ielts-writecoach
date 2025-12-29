import * as zod from "zod";
import formErrorMessages from "../constants/formErrorMessages";

export interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpFormSchema = zod
  .object({
    userName: zod.string(formErrorMessages.fieldRequired),
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
    confirmPassword: zod
      .string(formErrorMessages.fieldRequired)
      .nonempty(formErrorMessages.fieldRequired),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: formErrorMessages.passwordsUnmatch,
    path: ["confirmPassword"],
  });
