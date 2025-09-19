import React, { useCallback } from "react";

import { useKeyEventHandler } from "@/lib/useKeyEventHandler";
import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";

type GameControlsProps = {
  onReset: () => void;
  onPass: () => void;
  passDisabled: boolean;
  isGameComplete: boolean;
};

export const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onPass,
  passDisabled,
  isGameComplete,
}) => {
  const handleResetKeyEvent = useCallback(() => {
    if (!isGameComplete) return;
    onReset();
  }, [onReset, isGameComplete]);

  useKeyEventHandler("Enter", handleResetKeyEvent);
  useKeyEventHandler("Space", handleResetKeyEvent);

  return (
    <styled.div display="flex" gap="5">
      <Button
        size="md"
        onClick={onReset}
        variant={isGameComplete ? "primary" : "secondary"}
      >
        Reset
      </Button>
      <Button size="md" onClick={onPass} disabled={passDisabled}>
        Pass
      </Button>
    </styled.div>
  );
};
