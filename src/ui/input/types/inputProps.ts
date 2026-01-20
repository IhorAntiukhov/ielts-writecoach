import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, any, T>;
  placeholder: string;
  keyboardType: KeyboardTypeOptions | "password";
  errors: FieldErrors<T>;
}

export default InputProps;
