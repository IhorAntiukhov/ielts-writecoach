import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useRawToast,
} from "@/components/ui/toast";

export default function useToast() {
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
          className="mb-4"
        >
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{text}</ToastDescription>
        </Toast>
      ),
    });
  };
}
