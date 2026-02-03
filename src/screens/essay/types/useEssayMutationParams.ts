import { MutationFunction } from "@tanstack/react-query";
import { UpdateEssayParams } from "./saveEssayParams";

interface UseEssayMutationParams<
  T extends UpdateEssayParams,
  U extends void | number,
> {
  mutationFn: MutationFunction<U, T>;
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  toastTitle: string;
  toastSuccessMessage: string;
  redirectToReview: boolean;
}

export default UseEssayMutationParams;
