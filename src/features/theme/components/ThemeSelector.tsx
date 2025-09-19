import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/ui/Button";

import { useTheme } from "../hooks/useTheme";

export const ThemeSelector: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </Button>
  );
};
