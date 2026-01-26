import { FieldValues } from "react-hook-form";
import InputProps from "./inputProps";

interface TextAreaInputProps<T extends FieldValues> extends InputProps<T> {
  maxLength: number;
  autoCorrect?: boolean;
  largeTextArea?: boolean;
}

export default TextAreaInputProps;
