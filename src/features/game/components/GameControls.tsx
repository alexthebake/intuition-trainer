import React from "react";
import { styled } from "@/styles/jsx";
import { Button } from "../../../ui/Button";

type GameControlsProps = {
  onReset: () => void;
  onPass: () => void;
  passDisabled: boolean;
};

export const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onPass,
  passDisabled,
}) => {
  return (
    <styled.div display="flex" gap="5">
      <Button size="md" onClick={onReset}>
        Reset
      </Button>
      <Button size="md" onClick={onPass} disabled={passDisabled}>
        Pass
      </Button>
    </styled.div>
  );
};
