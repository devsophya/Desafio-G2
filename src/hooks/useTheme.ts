import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import type { ThemeContextType } from "../contexts/theme";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
