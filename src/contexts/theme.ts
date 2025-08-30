import { createContext } from "react";
import type { ThemeMode } from "../constants/theme";
import { THEME_CONFIG } from "../constants/theme";

export interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof THEME_CONFIG.light | typeof THEME_CONFIG.dark;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
