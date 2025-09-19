import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextState | null>(null);
