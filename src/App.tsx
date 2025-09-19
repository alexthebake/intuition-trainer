import { GithubIcon } from "lucide-react";

import logoSrc from "@/assets/logo/logo.png";
import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";
import { ModalProvider } from "@/ui/Modal";
import { GameStage } from "@@/game";
import { PrivacyPolicy } from "@@/privacy-policy";
import { Stats } from "@@/statistics";
import { ThemeProvider, ThemeSelector } from "@@/theme";
import { Why } from "@@/why";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <styled.div pb="16">
          <AppHeader />
          <GameStage />
          <Stats />
          <AppFooter />
        </styled.div>
      </ModalProvider>
    </ThemeProvider>
  );
};

// Helpers

const goToGithub = () => {
  window.open("https://github.com/alexthebake/intuition-trainer", "_blank");
};

const AppHeader: React.FC = () => {
  return (
    <styled.div
      position="fixed"
      top="0"
      width="full"
      display="flex"
      justifyContent="space-between"
      gap="2"
      p="4"
    >
      <styled.div display="flex" alignItems="center" gap="2">
        <styled.img src={logoSrc} height="10" width="10" />
        <styled.span fontWeight="bold">Intuition Trainer</styled.span>
      </styled.div>
      <styled.div display="flex" alignItems="center" gap="2">
        <Button size="icon" onClick={goToGithub}>
          <GithubIcon />
        </Button>
        <ThemeSelector />
      </styled.div>
    </styled.div>
  );
};

const AppFooter: React.FC = () => {
  return (
    <styled.div display="flex" alignItems="center" justifyContent="center">
      <Why />
      <PrivacyPolicy />
    </styled.div>
  );
};
