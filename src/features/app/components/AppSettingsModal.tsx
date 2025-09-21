import { titleize } from "@/lib/titleize";
import { styled } from "@/styles/jsx";
import { Modal } from "@/ui/Modal";
import { appStore } from "@@/app/lib/app.store";
import { GAME_MODES, getGameModeDescription } from "@@/game/lib/game.data";
import { GameMode } from "@@/game/lib/game.types";

export type AppSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AppSettingsModal: React.FC<AppSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const currentMode = appStore.use((state) => state.settings.mode);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      css={{ maxW: { base: "90vw", md: "1/3" } }}
    >
      <styled.div display="flex" flexDirection="column" gap="4">
        <styled.h2 fontSize="lg" fontWeight="bold">
          Settings
        </styled.h2>

        <styled.div display="flex" flexDirection="column" gap="2">
          <styled.label fontWeight="bold">Mode</styled.label>
          <styled.select
            border="1px solid"
            borderColor="input.border"
            p="2"
            rounded="md"
            value={currentMode || GAME_MODES.default.name}
            onChange={(e) => {
              console.log({ mode: e.target.value });
              appStore.actions.setSettings({
                mode: e.target.value as GameMode,
              });
            }}
          >
            {Object.values(GAME_MODES).map((mode) => (
              <styled.option key={mode.name} value={mode.name}>
                {titleize(mode.name)}
              </styled.option>
            ))}
          </styled.select>
          <styled.p fontSize="sm" color="text.secondary">
            {getGameModeDescription(currentMode)}
          </styled.p>
        </styled.div>
      </styled.div>
    </Modal>
  );
};
