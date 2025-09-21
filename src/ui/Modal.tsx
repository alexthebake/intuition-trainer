import { XIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { create } from "zustand";

import { useKeyEventHandler } from "@/lib/useKeyEventHandler";
import { styled } from "@/styles/jsx";

import { Button } from "./Button";
import { WithCss } from "@/styles/types";

type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}> &
  WithCss;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  css,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useTrackModalStateChange(isOpen);
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
          maxHeight="95vh"
          overflowY="auto"
          maxWidth={{ base: "90vw", md: "1/2" }}
          width="full"
          padding="8"
          bg="modal.bg"
          borderRadius="md"
          shadow="md"
          css={css}
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

type ModalStoreState = {
  modalStack: number;
};

const useModalStore = create<ModalStoreState>()(() => ({
  modalStack: 0,
}));

const useTrackModalStateChange = (isOpen: boolean) => {
  // Increment the modalStack on open and decrement on close
  useEffect(() => {
    const delta = isOpen ? 1 : -1;
    useModalStore.setState(({ modalStack }) => ({
      modalStack: modalStack + delta,
    }));
  }, [isOpen]);

  // Decrement the modalStack on unmount (even if isOpen hasn't changed)
  useEffect(() => {
    return () => {
      useModalStore.setState(({ modalStack }) => ({
        modalStack: modalStack - 1,
      }));
    };
  }, []);
};

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const hasModalOpen = useModalStore((state) => state.modalStack > 0);

  useEffect(() => {
    if (hasModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hasModalOpen]);

  return children;
};
