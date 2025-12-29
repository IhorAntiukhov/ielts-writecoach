const formErrorMessages = {
  fieldRequired: "Field is required",
  invalidEmail: "Enter a valid email",
  passwordTooShort: "Password must be at least 6 characters long",
  passwordsUnmatch: "Passwords do not match",
} as const;

export default formErrorMessages;
