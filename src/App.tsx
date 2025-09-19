import { Stats } from "@/features/statistics/components/Stats";
import { GameStage } from "@@/game";
import { ThemeProvider, ThemeSelector } from "@@/theme";
import { styled } from "./styles/jsx";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <styled.div pb="16">
        <ThemeSelector />
        <GameStage />
        <Stats />
      </styled.div>
    </ThemeProvider>
  );
};
