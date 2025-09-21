import { GithubIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

import logoSrc from "@/assets/logo/logo.png";
import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";
import { AppSettingsModal } from "@@/app/components/AppSettingsModal";
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
      <AppSettingsModal
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
