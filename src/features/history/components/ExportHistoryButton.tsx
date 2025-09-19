import { FileDownIcon } from "lucide-react";

import { Button } from "@/ui/Button";
import { styled } from "@/styles/jsx";
import { historyStore } from "@@/history/lib/history.store";

const handleExportHistory = () => {
  historyStore.actions.exportHistoryAsJSON();
};

export type ExportHistoryButtonProps = {
  disabled?: boolean;
};

export const ExportHistoryButton: React.FC<ExportHistoryButtonProps> = ({
  disabled,
}) => {
  return (
    <styled.div display="flex" alignItems="center" gap="2">
      <Button
        onClick={handleExportHistory}
        variant="secondary"
        size="xs"
        disabled={disabled}
      >
        <FileDownIcon />
        Export Data
      </Button>
    </styled.div>
  );
};
