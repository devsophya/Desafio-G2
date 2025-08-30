import React, { useEffect, useState } from "react";
import type { ThemeMode } from "../constants/theme";
import { THEME_CONFIG } from "../constants/theme";
import type { ThemeContextType } from "./theme";
import { ThemeContext } from "./theme";

const STORAGE_KEY = "g2-theme-preference";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Verifica preferência salva no localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === "light" || saved === "dark")) {
      return saved;
    }
    return defaultTheme;
  });

  const colors = THEME_CONFIG[mode];

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleTheme = () => {
    setTheme(mode === "light" ? "dark" : "light");
  };

  // Aplica o tema no document root
  useEffect(() => {
    const root = document.documentElement;

    // Remove todas as classes de tema
    root.classList.remove("theme-light", "theme-dark");

    // Aplica a classe do tema atual
    root.classList.add(`theme-${mode}`);

    // Define atributo para CSS
    root.setAttribute("data-theme", mode);

    // Log apenas em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`✅ Tema aplicado: ${mode}`, {
        classes: root.classList.toString(),
      });
    }
  }, [mode]);

  // Escuta mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Só aplica se não há preferência manual salva
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const value: ThemeContextType = {
    mode,
    colors,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
