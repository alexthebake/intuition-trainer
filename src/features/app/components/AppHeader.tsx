import { GithubIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

import logoSrc from "@/assets/logo/logo.png";
import { titleize } from "@/lib/titleize";
import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal";
import { appStore } from "@@/app/lib/app.store";
import { GAME_MODES, GameMode, getGameModeDescription } from "@@/game";
import { ThemeSelector } from "@@/theme";

export const AppHeader: React.FC = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <styled.div
        position="fixed"
        top="0"
        width="full"
        display="flex"
        justifyContent="space-between"
        bg={{ base: "bg/60", md: "transparent" }}
        backdropFilter={{ base: "blur(10px)", md: "none" }}
        gap="2"
        p="4"
        zIndex="999"
      >
        <styled.div display="flex" alignItems="center" gap="2">
          <styled.img src={logoSrc} height="10" width="10" />
          <styled.span fontWeight="bold">Intuition Trainer</styled.span>
        </styled.div>
        <styled.div display="flex" alignItems="center" gap="2">
          <Button size="icon" onClick={goToGithub}>
            <GithubIcon />
          </Button>
          <Button size="icon" onClick={() => setIsSettingsModalOpen(true)}>
            <SettingsIcon />
          </Button>
          <ThemeSelector />
        </styled.div>
      </styled.div>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};

// Helpers

const goToGithub = () => {
  window.open("https://github.com/alexthebake/intuition-trainer", "_blank");
};

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const currentMode = appStore.use((state) => state.settings.mode);

  console.log({ currentMode });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
