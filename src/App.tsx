import { styled } from "@/styles/jsx";
import { ModalProvider } from "@/ui/Modal";
import { AppFooter, AppHeader } from "@@/app";
import { GameStage } from "@@/game";
import { Stats } from "@@/statistics";
import { ThemeProvider } from "@@/theme";

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
