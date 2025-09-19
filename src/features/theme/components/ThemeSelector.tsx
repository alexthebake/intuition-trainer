import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/ui/Button";
import { styled } from "@/styles/jsx";

import { useTheme } from "../hooks/useTheme";

export const ThemeSelector: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <styled.div position="absolute" top="5" right="5">
      <Button onClick={toggleTheme}>
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
        <span>{theme === "light" ? "Dark" : "Light"}</span>
      </Button>
    </styled.div>
  );
};
