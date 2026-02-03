import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { createContext, useState } from "react";
import { Text } from "react-native";

interface ShowDialogParams {
  title: string;
  content: string;
  onConfirm: () => void;
}

type AlertDialogContextProps = {
  showDialog: (params: ShowDialogParams) => void;
} | null;

export const AlertDialogContext = createContext<AlertDialogContextProps>(null);

export default function AlertDialogProvider({
  children,
}: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<ShowDialogParams | null>(null);

  const showDialog = ({ title, content, onConfirm }: ShowDialogParams) => {
    setParams({
      title,
      content,
      onConfirm,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    handleClose();
    params?.onConfirm();
  };

  return (
    <>
      {params && (
        <AlertDialog isOpen={isOpen} onClose={handleClose} size="md">
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Text className="text-typography-950 font-bold text-2xl">
                {params.title}
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody className="mt-3 mb-4">
              <Text className="text-typography-950 text-md">
                {params.content}
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="solid" action="secondary" onPress={handleClose}>
                <ButtonText>Cancel</ButtonText>
              </Button>

              <Button variant="solid" action="negative" onPress={handleConfirm}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <AlertDialogContext.Provider value={{ showDialog }}>
        {children}
      </AlertDialogContext.Provider>
    </>
  );
}
