import { Trash2Icon } from "lucide-react";

import { Button } from "@/ui/Button";
import { styled } from "@/styles/jsx";
import { historyStore } from "@@/history/lib/history.store";

const handleResetHistory = () => {
  if (
    window.confirm(
      "Are you sure you want to delete all game history? This action cannot be undone."
    )
  ) {
    historyStore.actions.clearHistory();
  }
};

export type ResetHistoryButtonProps = {
  disabled?: boolean;
};

export const ResetHistoryButton: React.FC<ResetHistoryButtonProps> = ({
  disabled,
}) => {
  return (
    <styled.div display="flex" alignItems="center" gap="2">
      <Button
        onClick={handleResetHistory}
        variant="danger"
        size="xs"
        disabled={disabled}
      >
        <Trash2Icon />
        Reset History
      </Button>
    </styled.div>
  );
};
