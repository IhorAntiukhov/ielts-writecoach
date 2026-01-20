import { FieldValues } from "react-hook-form";
import InputProps from "./inputProps";

interface OutlineInputProps<T extends FieldValues> extends InputProps<T> {
  icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
}

export default OutlineInputProps;
