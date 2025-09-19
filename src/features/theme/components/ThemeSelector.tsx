import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/ui/Button";

import { useTheme } from "../hooks/useTheme";
import { styled } from "@/styles/jsx";

export const ThemeSelector: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <styled.div display={{ base: "block", md: "none" }}>
        <Button onClick={toggleTheme} size="icon">
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </styled.div>
      <styled.div display={{ base: "none", md: "block" }}>
        <Button onClick={toggleTheme}>
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
          <styled.span>{theme === "light" ? "Dark" : "Light"}</styled.span>
        </Button>
      </styled.div>
    </>
  );
};
