import { useTheme } from "./useTheme";

export const useIsDarkMode = () => {
  const { theme } = useTheme();
  return theme === "dark";
};
