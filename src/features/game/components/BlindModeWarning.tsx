import { styled } from "@/styles/jsx";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { appStore } from "@@/app";
import { getGameModeDescription } from "@@/game/lib/game.data";

export const BlindModeWarning: React.FC = () => {
  return (
    <Alert
      css={{ mt: "4", maxW: "450", textAlign: "center", alignItems: "center" }}
    >
      <styled.span fontWeight="bold">
        You are currently in blind mode.
      </styled.span>
      <styled.span fontSize="xs" fontWeight="normal">
        {getGameModeDescription("blind")}
      </styled.span>
      <Button
        variant="ghost"
        onClick={() => appStore.actions.setSettings({ mode: "default" })}
      >
        Exit Blind Mode
      </Button>
    </Alert>
  );
};
