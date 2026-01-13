import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useRawToast,
} from "@/components/ui/toast";
import { clsx } from "clsx";
import { use } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useToast() {
  const { session } = use(AuthContext);
  const toast = useRawToast();

  return (
    action: "error" | "warning" | "success" | "info" | "muted",
    title: string,
    text: string,
  ) => {
    const toastId = Math.random().toString(36);

    toast.show({
      id: toastId,
      placement: "bottom",
      duration: 3000,
      render: ({ id }) => (
        <Toast
          nativeID={"toast-" + id}
          action={action}
          variant="solid"
          className={clsx("max-w-full", session ? "mb-[6.5rem]" : "mb-4")}
        >
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{text}</ToastDescription>
        </Toast>
      ),
    });
  };
}
