import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useRawToast,
} from "@/components/ui/toast";
import { clsx } from "clsx";
import { useSegments } from "expo-router";

export default function useToast() {
  const segments = useSegments();
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
          className={clsx(
            "max-w-full",
            segments[0] === "(tabs)" ? "mb-[6.5rem] -mt-[6rem]" : "mb-4",
          )}
        >
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{text}</ToastDescription>
        </Toast>
      ),
    });
  };
}
