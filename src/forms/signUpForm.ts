import * as zod from "zod";
import formErrorMessages from "../screens/login/constants/formErrorMessages";

export interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormData {
  password: string;
  confirmPassword: string;
}

const zodObject = {
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
};

export const signUpFormSchema = zod
  .object(zodObject)
  .refine((data) => data.password === data.confirmPassword, {
    error: formErrorMessages.passwordsUnmatch,
    path: ["confirmPassword"],
  });

export const changePasswordFormSchema = zod
  .object({
    password: zodObject.password,
    confirmPassword: zodObject.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: formErrorMessages.passwordsUnmatch,
    path: ["confirmPassword"],
  });
