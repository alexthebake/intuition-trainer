import { XIcon } from "lucide-react";
import { useCallback } from "react";

import { useKeyEventHandler } from "@/lib/useKeyEventHandler";
import { styled } from "@/styles/jsx";

import { Button } from "./Button";

type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useKeyEventHandler("Escape", handleClose);

  if (!isOpen) return null;

  return (
    <styled.div position="fixed" inset="0" zIndex="1000">
      <styled.div
        position="absolute"
        inset="0"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        onClick={onClose}
      />
      <styled.div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="full"
      >
        <styled.div
          position="relative"
          maxWidth={{ base: "90%", md: "1/2" }}
          width="full"
          padding="8"
          bg="modal.bg"
          borderRadius="md"
          shadow="md"
        >
          <styled.div position="absolute" top="4" right="4">
            <Button variant="ghost" size="iconSmall" onClick={onClose}>
              <XIcon />
            </Button>
          </styled.div>
          {children}
        </styled.div>
      </styled.div>
    </styled.div>
  );
};
