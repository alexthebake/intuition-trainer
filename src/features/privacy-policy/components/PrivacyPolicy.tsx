import { useState } from "react";

import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal";

export const PrivacyPolicy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <styled.div
        mt="16"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          Privacy Policy
        </Button>
      </styled.div>
      <PrivacyPolicyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

type PrivacyPolicyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <styled.div display="flex" flexDirection="column" gap="4">
        <styled.h2 fontSize="xl" fontWeight="bold">
          Privacy Policy
        </styled.h2>
        <styled.p>This app does not collect any personal data.</styled.p>
        <styled.p>
          It does not use any third-party services that collect data.
        </styled.p>
        <styled.p>
          It stores your game history in your browser's local storage, and does
          not share it with me or anyone else.
        </styled.p>
      </styled.div>
    </Modal>
  );
};
